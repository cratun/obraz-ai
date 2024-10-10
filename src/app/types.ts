export type CheckoutMetadata = {
  imageId: string;
  size: SearchParam;
};

export type SerachParams = { [key: string]: string | string[] | undefined };

export type SearchParam = string | Array<string> | undefined;

export type MockupImages = Record<string, string[]>;
