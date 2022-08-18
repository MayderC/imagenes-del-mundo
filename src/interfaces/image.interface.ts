export interface IImageGoogleAPI {
  position: number;
  thumbnail: string;
  source: string;
  title: string;
  link: string;
  original: string;
  is_product: boolean;
  in_stock?: boolean;
}

export interface IImage extends IImageGoogleAPI {
  sellerID: number;
}
