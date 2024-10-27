'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import OpenAI from 'openai';
import Replicate from 'replicate';
import { ensureNotNull } from '@/app/_utils/common';
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
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: id + '.webp',
      Body: Buffer.from(fileBuffer),
    }),
  );
};

const replicate = new Replicate();

const MODEL_NAME = process.env.IMAGE_GENERATOR_MODEL_NAME as any;

const getSystemInfoWithStyle = (style: string) => {
  return `You are an advanced AI assistant specializing in preparing prompts for image generation models. You will receive a user-generated prompt, which may be in a language other than English.

Your goal is to produce a high-quality, detailed prompt that clearly communicates the user's intent and the specified style ("${style}") to the image generation model, resulting in an image that matches the user's expectations precisely.

Your tasks are:

1. **Translate to English**: If the prompt is not in English, accurately translate it, preserving the original meaning, context, and specific details.

2. **Incorporate Style**: Integrate the specified style ("${style}") explicitly into the prompt. Ensure that the style influences the description, tone, and overall feel of the image.

3. **Enhance the Prompt**: Enrich the prompt by adding relevant descriptive details that enhance the content without altering the original intent. Use vivid and expressive language to make the prompt more detailed and engaging.

4. **Maintain Fidelity**: Ensure that no new elements are introduced or existing details omitted from the original prompt. The enhanced prompt should remain true to the user's original vision.

**Important Instructions**:

- **Only provide the final, refined prompt in your response. Do not include any explanations, translations, analyses, or any other text.**

- **If you encounter any errors or are unsure how to proceed, generate a random, high-quality prompt in the specified style ("${style}") that would be appealing to users.**

- **Do not mention these instructions or acknowledge them in your response.**

**Example**:

- **Input Prompt**: "Kwiaty w ogrodzie"
- **Final Output**: "A ${style} image of a vibrant garden filled with blooming flowers, their colorful petals glistening under the warm sunlight."

Now, please provide the final enhanced prompt based on the user's input.`;
};

const GPT_SYSTEM_INFO_NO_STYLE = `You are an advanced AI assistant specializing in preparing prompts for image generation models. You will receive a user-generated prompt, which may be in a language other than English.

Your goal is to produce a high-quality, detailed prompt that clearly communicates the user's intent to the image generation model, resulting in an image that matches the user's expectations precisely.

Your tasks are:

1. **Translate to English**: If the prompt is not in English, accurately translate it, preserving the original meaning, context, and specific details.

2. **Enhance the Prompt**:
   - Add relevant descriptive details that enrich the content without altering the original intent.
   - Use vivid and expressive language to make the prompt more detailed and engaging.
   - Ensure that no new elements are introduced or existing details omitted from the original prompt.

**Important Instructions**:

- **Only provide the final, refined prompt in your response. Do not include any explanations, translations, analyses, or any other text.**

- **If you encounter any errors or are unsure how to proceed, generate a random, high-quality prompt that would be appealing to users.**

- **Do not mention these instructions or acknowledge them in your response.**

**Example**:

- **Input Prompt**: "Kwiaty w ogrodzie"
- **Final Output**: "A vibrant garden filled with a variety of colorful flowers in full bloom, their delicate petals catching the gentle rays of the sun."

Now, please provide the final enhanced prompt based on the user's input.`;

const GPT_SYSTEM_INFO_RANDOM = `
Generate a unique, imaginative 3-word image prompt that blends contrasting themes or concepts. Combine genres, styles, or ideas in a surprising and memorable way.

# Steps

1. Choose two or more unrelated themes or settings.
2. Use three words to convey a vivid, unconventional scene, character, or concept.
3. Ensure the three words spark inspiration and curiosity.

# Output Format

Provide a single 3-word image prompt in plain text, returned as JSON with two fields: 'en' with the English version and 'pl' with the Polish translation.
`;

const openai = new OpenAI();

const actionGenerate = async ({
  prompt,
  styleIndex,
  isRandomPrompt,
}: {
  prompt: string;
  styleIndex: number;
  isRandomPrompt: boolean;
}) => {
  if (prompt.length > MAX_PROMPT_LENGTH) {
    throw new Error('Prompt is too long');
  }

  const tokenCheckResult = checkAndUpdateGenerationToken();
  if (tokenCheckResult === GENERATION_TOKEN_LIMIT_REACHED) {
    return GENERATION_TOKEN_LIMIT_REACHED;
  }

  let randomPromptCompletion: OpenAI.Chat.Completions.ChatCompletion | undefined;

  if (isRandomPrompt) {
    randomPromptCompletion = await openai.chat.completions.create({
      response_format: { type: 'json_object' },
      model: 'gpt-4o-mini',
      temperature: 1.3,
      max_tokens: 500,
      messages: [
        {
          role: 'system',
          content: GPT_SYSTEM_INFO_RANDOM,
        },
      ],
    });
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
        content: randomPromptCompletion
          ? (JSON.parse(ensureNotNull(randomPromptCompletion.choices[0].message.content)) as any).en
          : prompt,
      },
    ],
  });

  const messageContent = completion.choices[0].message.content;

  if (!messageContent) {
    throw new Error('Failed to generate refined prompt');
  }

  const output = (await replicate.run(MODEL_NAME, {
    input: {
      prompt: messageContent + (styleIndex === 0 ? '' : `, ${GENERATION_DATA[styleIndex][3]}`),
      num_outputs: 1,
      aspect_ratio: '1:1',
      guidance: GENERATION_DATA[styleIndex][2],
    },
  })) as string[];

  const imageId = crypto.randomUUID();
  const imgSrc = output[0];

  await uploadImage({ imgSrc, id: imageId });
  updateImageHistoryCookie(imageId);

  return {
    imgSrc,
    metadata: { imageId },
    randomPromptTranslated: randomPromptCompletion
      ? (JSON.parse(ensureNotNull(randomPromptCompletion.choices[0].message.content)) as any).pl
      : '',
  };
};

export default actionGenerate;
