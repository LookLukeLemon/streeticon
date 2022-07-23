export type StoreProfile = {
  businessId: string;
  image: string;
  name: string;
  address: string;
  category: string;
  desc: string;
  phone: string;
};

export type SignInProps = {
  username: string;
  password: string;
};

export type GifticonItemDto = {
  name: string;
  desc: string;
  price: string;
  totalCount: number;
  soldCount: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  createdAt: string;
};

export type UpdateGifticonItemDto = {
  name: string;
  desc: string;
  price: string;
  totalCount: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
};

export type GifticonApi = {
  onClickUpdate: (name: string) => void;
};

export type GifticonItemsProps = GifticonItemDto[] | undefined;
