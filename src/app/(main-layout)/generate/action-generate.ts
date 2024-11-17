'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import dayjs from 'dayjs';
import OpenAI from 'openai';
import Replicate from 'replicate';
import { updateSpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import { ensureNotNull } from '@/app/_utils/common';
import { GENERATION_DATA, GenerationStyle, getIsGenerationStyle, MAX_PROMPT_LENGTH } from '@/app/_utils/constants';
import { GENERATION_TOKEN_LIMIT_REACHED } from './_utils/common';
import { checkAndUpdateGenerationToken } from './_utils/generation-token';
import { updateImageHistoryCookie } from './_utils/image-history/server';

const s3Client = new S3Client({ region: 'eu-central-1' });

const uploadImage = async ({ imgSrc, id }: { imgSrc: string; id: string }) => {
  if (!imgSrc || !id) {
    throw new Error('Missing required parameters for image upload');
  }

  const fileResponse = await fetch(imgSrc);

  if (!fileResponse.ok) {
    throw new Error('Failed to download the file');
  }

  const fileBuffer = await fileResponse.arrayBuffer();

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: id + '.webp',
      Body: Buffer.from(fileBuffer),
    }),
  );
};

const replicate = new Replicate();

const MODEL_NAME = process.env.IMAGE_GENERATOR_MODEL_NAME as any;

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

  const output = (await replicate.run(MODEL_NAME, {
    input: {
      prompt: generationData.imagePromptWrapper(messageContent),
      num_outputs: 1,
      aspect_ratio: '1:1',
      ...generationData.modelConfig,
    },
  })) as string[];

  const imageId = crypto.randomUUID();
  const imgSrc = output[0];

  await Promise.all([uploadImage({ imgSrc, id: imageId }), updateSpecialPromoCookie()]);
  updateImageHistoryCookie(imageId);

  return { imgSrc, metadata: { imageId, creationDateTimestamp: dayjs().unix() } };
};

export default actionGenerate;
