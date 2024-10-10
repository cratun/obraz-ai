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
  return `You are an advanced AI assistant specializing in preparing prompts for image generation models. You will receive a user-generated prompt, which may be in a language other than English. Your tasks are:

1. **Translate to English**: If the prompt is not in English, accurately translate it, preserving the original meaning, context, and specific details.

2. **Understand User Intent**: Analyze the key elements and desired outcome expressed in the prompt to grasp the user's intent fully.

3. **Incorporate Style**: Integrate the specified style ("${style}") explicitly into the prompt. Ensure that the style influences the description, tone, and overall feel of the image. For example, start the prompt with "A ${style} image of..." to set the stylistic context from the beginning.

4. **Enhance the Prompt**: Enrich the prompt by adding relevant descriptive details that enhance the content without altering the original intent. Use vivid and expressive language to make the prompt more detailed and engaging.

5. **Maintain Fidelity**: Ensure that no new elements are introduced or existing details omitted from the original prompt. The enhanced prompt should remain true to the user's original vision.

6. **Final Output**: Return the refined and enhanced prompt in clear, fluent English, ready for the image generation model to use.

**Example Structure**:
- Start with the style: "A ${style} image of..."
- Describe the main subject and key elements.
- Add descriptive details that align with the specified style.
- Ensure clarity and coherence throughout the prompt.

**Your Goal**: Produce a high-quality, detailed prompt that clearly communicates the user's intent and the specified "${style}" to the image generation model, resulting in an image that matches the user's expectations precisely.`;
};

const GPT_SYSTEM_INFO_NO_STYLE = `You are an advanced AI assistant specializing in preparing prompts for image generation models. You will receive a user-generated prompt, which may be in a language other than English. Your tasks are:

1. **Translate to English**: If the prompt is not in English, accurately translate it, preserving the original meaning, context, and specific details.

2. **Understand User Intent**: Analyze the key elements and desired outcome expressed in the prompt to fully grasp the user's intent.

3. **Enhance the Prompt**:
   - **Upsample and Improve**: Add relevant descriptive details that enrich the content without altering the original intent. Use vivid and expressive language to make the prompt more detailed and engaging.
   - **Maintain Fidelity**: Ensure that no new elements are introduced or existing details omitted from the original prompt. The enhanced prompt should remain true to the user's original vision.

4. **Ensure Clarity and Coherence**: Organize the prompt in a clear and logical manner, ensuring that it is easy to understand and free of ambiguities.

5. **Final Output**: Return the refined and enhanced prompt in clear, fluent English, ready for the image generation model to use.

**Example Structure**:
- **Start with the main subject**: Clearly identify the primary focus of the image.
- **Describe key elements**: Include important details that define the scene or subject.
- **Add descriptive enhancements**: Use expressive language to add depth and richness to the prompt.
- **Ensure overall coherence**: Make sure the prompt flows naturally and logically.

**Your Goal**: Produce a high-quality, detailed prompt that clearly communicates the user's intent to the image generation model, resulting in an image that matches the user's expectations precisely. The enhanced prompt should be engaging, descriptive, and maintain full fidelity to the original content provided by the user.
`;

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
