'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import dayjs from 'dayjs';
import OpenAI from 'openai';
import Replicate from 'replicate';
import sharp from 'sharp';
import { updateSpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import { ensureNotNull, getBucketImgUrl } from '@/app/_utils/common';
import { GENERATION_DATA, GenerationStyle, getIsGenerationStyle, MAX_PROMPT_LENGTH } from '@/app/_utils/constants';
import { GENERATION_TOKEN_LIMIT_REACHED } from './_utils/common';
import { checkAndUpdateGenerationToken } from './_utils/generation-token';
import { updateImageHistoryCookie } from './_utils/image-history/server';

const s3Client = new S3Client({ region: 'eu-central-1' });
const replicate = new Replicate();

const MODEL_NAME = process.env.IMAGE_GENERATOR_MODEL_NAME as any;
const MODEL_NAME_IMPRESSIONISM = process.env.IMAGE_GENERATOR_MODEL_NAME_IMPRESSIONISM as any;
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

  const watermarkPromise = fetch(WATERMARK_URL)
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

  const output = (await replicate.run(
    generationData.generationStyle === 'impressionism' ? MODEL_NAME_IMPRESSIONISM : MODEL_NAME,
    {
      input: {
        prompt: generationData.imagePromptWrapper(messageContent),
        aspect_ratio: '1:1',
        prompt_upsampling: true,
        ...generationData.modelConfig,
      },
    },
  )) as any;

  const imageId = crypto.randomUUID();
  const imgSrc = generationData.generationStyle === 'impressionism' ? output[0] : output;

  const [fileBuffer, watermarkBuffer] = await Promise.all([
    fetch(imgSrc)
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
