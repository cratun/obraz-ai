'use server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({ region: 'eu-central-1' });

const uploadImage = async ({ src, id }: { src: string; id: string }) => {
  if (!src || !id) {
    throw new Error();
  }

  const fileResponse = await fetch(src);

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

export default uploadImage;
