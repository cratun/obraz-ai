export const ensureNotNull = <T>(argument: T | undefined | null): T => {
  if (argument === undefined || argument === null) {
    throw new TypeError('This value was promised to be there.');
  }

  return argument;
};

export const generationStyles = [
  ['surprise', 'Zaskocz mnie'],
  ['surrealism', 'Surrealizm'],
  ['hyper-realistic', 'Hiperrealizm'],
  ['cyberpunk', 'Cyberpunk'],
  ['anime', 'Anime'],
  ['impressionism', 'Impresjonizm'],
  ['pop-art', 'Pop-art'],
  ['minimalism', 'Minimalizm'],
  ['cubism', 'Kubizm'],
] as const;

export const getBucketImgUrl = (id: string) =>
  `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.eu-central-1.amazonaws.com/${id}.webp`;

export const groszToPLN = (grosz: number) => grosz / 100;
