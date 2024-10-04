'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import OpenAI from 'openai';
import Replicate from 'replicate';
import { GENERATION_DATA, MAX_PROMPT_LENGTH } from '@/app/_utils/constants';
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
      Bucket: process.env.S3_BUCKET_NAME,
      Key: id + '.webp',
      Body: Buffer.from(fileBuffer),
    }),
  );
};

const replicate = new Replicate();

const MODEL_NAME = process.env.IMAGE_GENERATOR_MODEL_NAME as any;

const getSystemInfoWithStyle = (style: string) => {
  return `You will be provided with a user-generated prompt for an image generation model. Your task is to refine and enhance the prompt to generate the desired image in a ${style} style. Ensure that the refined prompt is clear, detailed, and maintains the original intent of the user. Return the refined prompt in English. The prompt must contain the name of the style, so that the image generation model knows for sure which style it is, for example "A Hyperrealistic image of..." `;
};

const GPT_SYSTEM_INFO_NO_STYLE =
  'You will be provided with a user-generated prompt for an image generation model. Your task is to refine and enhance the prompt to generate the desired image. Ensure that the refined prompt is clear, detailed, and maintains the original intent of the user. Return the refined prompt in English.';

const openai = new OpenAI();

const actionGenerate = async ({ prompt, styleIndex }: { prompt: string; styleIndex: number }) => {
  if (prompt.length > MAX_PROMPT_LENGTH) {
    throw new Error('Prompt is too long');
  }

  const tokenCheckResult = checkAndUpdateGenerationToken();
  if (tokenCheckResult === GENERATION_TOKEN_LIMIT_REACHED) {
    return GENERATION_TOKEN_LIMIT_REACHED;
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: styleIndex === 0 ? GPT_SYSTEM_INFO_NO_STYLE : getSystemInfoWithStyle(GENERATION_DATA[styleIndex][3]),
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const refinedPrompt = completion.choices[0].message.content;

  if (!refinedPrompt) {
    throw new Error('Failed to generate refined prompt');
  }

  const output = (await replicate.run(MODEL_NAME, {
    input: { prompt: refinedPrompt, num_outputs: 1, aspect_ratio: '1:1', guidance: GENERATION_DATA[styleIndex][2] },
  })) as string[];

  const imageId = crypto.randomUUID();
  const imgSrc = output[0];

  await uploadImage({ imgSrc, id: imageId });
  updateImageHistoryCookie(imageId);

  return {
    imgSrc,
    metadata: { imageId },
  };
};

export default actionGenerate;
