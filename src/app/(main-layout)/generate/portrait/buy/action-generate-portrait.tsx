'use server';

import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dayjs from 'dayjs';
import convert from 'heic-convert';
import Replicate from 'replicate';
import sharp from 'sharp';
import { GENERATION_TOKEN_LIMIT_REACHED } from '@/app/(main-layout)/generate/_utils/common';
import { checkAndUpdateGenerationToken } from '@/app/(main-layout)/generate/_utils/generation-token';
import { updateImageHistoryCookie } from '@/app/(main-layout)/generate/_utils/image-history/server';
import { updateSpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import { getBucketImgUrl } from '@/app/_utils/common';
import { MAX_PROMPT_LENGTH } from '@/app/_utils/constants';
const s3Client = new S3Client({ region: 'eu-central-1' });
const replicate = new Replicate();

const FACE_SWAP_MODEL_NAME = 'codeplugtech/face-swap:278a81e7ebb22db98bcba54de985d22cc1abeead2754eb1f2af717247be69b34';

const WATERMARK_URL = 'https://public-assets-obraz-ai.s3.eu-central-1.amazonaws.com/watermark-portrait.png';
const PORTRAIT_BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_PORTRAIT_IMAGES;

export const actionUploadImage = async (formData: FormData) => {
  const file = formData.get('file') as File;
  let fileBuffer: ArrayBuffer;

  if (!file) {
    throw new Error('No file provided');
  }

  // Handle HEIC/HEIF files
  if (file.type === 'image/heic' || file.type === 'image/heif') {
    const arrayBuffer = Buffer.from(await file.arrayBuffer());

    fileBuffer = await convert({
      buffer: arrayBuffer,
      format: 'JPEG',
      quality: 0.6,
    });
  } else {
    // For non-HEIC/HEIF files, process normally.
    fileBuffer = await file.arrayBuffer();
  }
  const jpegImage = await sharp(Buffer.from(fileBuffer)).jpeg({ quality: 60 }).toBuffer();
  const imageId = crypto.randomUUID();
  const portraitKey = `${imageId}.jpeg`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: PORTRAIT_BUCKET_NAME,
      Key: portraitKey,
      Body: jpegImage,
      ContentType: 'image/jpeg',
    }),
  );

  // Generate a presigned URL (expires in 1 hour)
  const signedUrl = await getSignedUrl(
    // @ts-expect-error
    s3Client,
    new GetObjectCommand({
      Bucket: PORTRAIT_BUCKET_NAME,
      Key: portraitKey,
    }),
    { expiresIn: 3600 },
  );

  return encodeURIComponent(signedUrl);
};

const actionGeneratePortrait = async ({ image, template }: { image: string; template: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 30000));
  if (image.length > MAX_PROMPT_LENGTH) {
    throw new Error('Prompt is too long');
  }

  const tokenCheckResult = checkAndUpdateGenerationToken();
  if (tokenCheckResult === GENERATION_TOKEN_LIMIT_REACHED) {
    return { imgSrc: null, metadata: {}, errorCode: GENERATION_TOKEN_LIMIT_REACHED } as const;
  }

  const watermarkPromise = fetch(WATERMARK_URL)
    .then((res) => res.arrayBuffer())
    .catch(() => {
      throw new Error('Failed to fetch watermark');
    });

  const output = (await replicate.run(FACE_SWAP_MODEL_NAME, {
    input: {
      swap_image: image,
      input_image: template,
    },
  })) as any;

  const imageId = crypto.randomUUID();

  const [fileBuffer, watermarkBuffer] = await Promise.all([
    fetch(output)
      .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject('Failed to fetch image')))
      .catch(() => {
        throw new Error('Failed to fetch generated image');
      }),
    watermarkPromise,
  ]);

  const sourceImage = Buffer.from(fileBuffer);

  // Optimize sharp operations
  const imageWithWatermark = await sharp(fileBuffer, {
    failOnError: false,
    density: 72, // Optimize for web
  })
    .composite([
      {
        input: Buffer.from(watermarkBuffer),
        gravity: 'center',
      },
    ])
    .sharpen({ sigma: 1 })
    .withMetadata()
    .toBuffer();

  await Promise.all([
    s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: `${imageId}.webp`,
        Body: imageWithWatermark,
        ContentType: 'image/webp',
      }),
    ),
    s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_SOURCE_IMAGES,
        Key: `${imageId}.webp`,
        Body: sourceImage,
        ContentType: 'image/webp',
      }),
    ),
    updateSpecialPromoCookie(),
    updateImageHistoryCookie(imageId, 'portrait'),
  ]);

  return {
    imgSrc: getBucketImgUrl(imageId),
    metadata: {
      imageId,
      creationDateTimestamp: dayjs().unix(),
    },
  };
};

export default actionGeneratePortrait;
