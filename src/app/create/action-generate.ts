'use server';

import OpenAI from 'openai';
import Replicate from 'replicate';
import { CheckoutMetadata } from '@/app/types';
import uploadImage from './action-upload-image';

const replicate = new Replicate();

const MODEL_NAME = process.env.IMAGE_GENERATOR_MODEL_NAME as any;
const GPT_SYSTEM_INFO =
  'You will be provided with a sentence, and your task is to translate it into English. If it is already in English, do not translate it.';

const openai = new OpenAI();

const actionGenerate = async ({ prompt }: { prompt: string }) => {
  if (prompt.split(' ').length > 400) {
    throw new Error();
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: GPT_SYSTEM_INFO,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const translatedPrompt = completion.choices[0].message.content;

  if (!translatedPrompt) {
    throw new Error();
  }

  const output = (await replicate.run(MODEL_NAME, {
    input: { prompt: translatedPrompt, num_outputs: 1, aspect_ratio: '1:1' },
  })) as string[];

  const imageId = crypto.randomUUID();

  uploadImage({ src: output[0], id: imageId });

  return { images: output, metadata: { initialPrompt: prompt, translatedPrompt, imageId } satisfies CheckoutMetadata };
};

export default actionGenerate;
