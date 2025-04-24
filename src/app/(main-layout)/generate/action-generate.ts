'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import dayjs from 'dayjs';
import OpenAI from 'openai';
import sharp from 'sharp';
import { updateSpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import { ensureNotNull, getBucketImgUrl } from '@/app/_utils/common';
import { GENERATION_DATA, GenerationStyle, getIsGenerationStyle, MAX_PROMPT_LENGTH } from '@/app/_utils/constants';
import { GENERATION_TOKEN_LIMIT_REACHED } from './_utils/common';
import { checkAndUpdateGenerationToken } from './_utils/generation-token';
import { updateImageHistoryCookie } from './_utils/image-history/server';

const s3Client = new S3Client({ region: 'eu-central-1' });

const WATERMARK_URL = 'https://public-assets-obraz-ai.s3.eu-central-1.amazonaws.com/watermark.png';

const openai = new OpenAI();

const actionGenerate = async ({ prompt, generationStyle }: { prompt: string; generationStyle: GenerationStyle }) => {
  if (prompt.length > MAX_PROMPT_LENGTH) {
    throw new Error('Prompt is too long');
  }

  const tokenCheckResult = checkAndUpdateGenerationToken();
  if (tokenCheckResult === GENERATION_TOKEN_LIMIT_REACHED) {
    return { imgSrc: null, metadata: {}, errorCode: GENERATION_TOKEN_LIMIT_REACHED } as const;
  }

  if (!getIsGenerationStyle(generationStyle)) {
    throw new Error('Invalid generation style');
  }

  const generationData = ensureNotNull(GENERATION_DATA.find((item) => item.generationStyle === generationStyle));

  const watermarkBuffer = await fetch(WATERMARK_URL)
    .then((res) => res.arrayBuffer())
    .catch(() => {
      throw new Error('Failed to fetch watermark');
    });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: generationData.prompt,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const messageContent = completion.choices[0].message.content;
  if (!messageContent) {
    throw new Error('Failed to generate refined prompt');
  }

  const result = await openai.images.generate({
    model: 'gpt-image-1',
    prompt: generationData.imagePromptWrapper(messageContent),
    n: 1,
    size: '1024x1024',
    output_format: 'webp',
    output_compression: 70,
    quality: 'medium',
  });
  const imageId = crypto.randomUUID();
  const image_base64 = result.data?.[0]?.b64_json;
  if (!image_base64) {
    throw new Error('Failed to generate image');
  }
  const sourceImage = Buffer.from(image_base64, 'base64');

  // Optimize sharp operations
  const imageWithWatermark = await sharp(sourceImage, {
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
    updateImageHistoryCookie(imageId, 'square'),
  ]);

  return {
    imgSrc: getBucketImgUrl(imageId),
    metadata: {
      imageId,
      creationDateTimestamp: dayjs().unix(),
    },
  };
};

export default actionGenerate;
