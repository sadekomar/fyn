export type ItemCardsData = {
  id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
};

export type ItemPageI = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  images: string[];
  categories: string[];
  colors: string[];
  gender: string;
  material: string;
  sizes: {
    name: string;
    available: boolean;
  }[];
};

export enum Genders {
  UNISEX = "Unisex",
  MALE = "Male",
  FEMALE = "Female",
}

export enum ImageSizes {
  PATTERN = "loom-image-dimensions",
  LARGE = "1080",
  MEDIUM = "600",
  SMALL = "460",
}
