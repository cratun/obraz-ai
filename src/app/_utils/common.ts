export const ensureNotNull = <T>(argument: T | undefined | null): T => {
  if (argument === undefined || argument === null) {
    throw new TypeError('This value was promised to be there.');
  }

  return argument;
};

export const getBucketImgUrl = (id: string, bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME, extension = '.webp') =>
  `https://${bucketName}.s3.eu-central-1.amazonaws.com/${id}${extension}`;

export const groszToPLN = (grosz: number) => grosz / 100;
