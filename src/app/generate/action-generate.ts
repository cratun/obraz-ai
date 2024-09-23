'use server';

import OpenAI from 'openai';
import Replicate from 'replicate';
import { GENERATION_STYLES } from '@/app/_utils/constants';
import uploadImage from './action-upload-image';

const replicate = new Replicate();

const MODEL_NAME = process.env.IMAGE_GENERATOR_MODEL_NAME as any;

const getSystemInfoWithStyle = (style: string) => {
  return `You will be provided with a user-generated prompt for an image generation model. Your task is to refine and enhance the prompt to generate the desired image in a ${style} style. Ensure that the refined prompt is clear, detailed, and maintains the original intent of the user. Return the refined prompt in English.`;
};

const GPT_SYSTEM_INFO_NO_STYLE =
  'You will be provided with a user-generated prompt for an image generation model. Your task is to refine and enhance the prompt to generate the desired image. Ensure that the refined prompt is clear, detailed, and maintains the original intent of the user. Return the refined prompt in English.';

const openai = new OpenAI();

const actionGenerate = async ({ prompt, styleIndex }: { prompt: string; styleIndex: number }) => {
  if (prompt.split(' ').length > 400) {
    throw new Error();
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: styleIndex === 0 ? GPT_SYSTEM_INFO_NO_STYLE : getSystemInfoWithStyle(GENERATION_STYLES[styleIndex][0]),
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const refinedPrompt = completion.choices[0].message.content;

  if (!refinedPrompt) {
    throw new Error();
  }

  const output = (await replicate.run(MODEL_NAME, {
    input: { prompt: refinedPrompt, num_outputs: 1, aspect_ratio: '1:1' },
  })) as string[];

  const imageId = crypto.randomUUID();
  const imgSrc = output[0];

  uploadImage({ imgSrc, id: imageId });

  return {
    imgSrc,
    metadata: { imageId },
  };
};

export default actionGenerate;
