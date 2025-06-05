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

export type ItemCardsI = {
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
  colors: { id: string; name: string }[];
  gender: string;
  material: string;
  link: string;
  sizes: {
    id: string;
    name: string;
    available: boolean;
  }[];
};

export type MetadataI = {
  items: {
    name: string;
    count: number;
  };
  genders: {
    name: string;
    count: number;
  }[];
  categories: {
    name: string;
    count: number;
  }[];
  colors: {
    name: string;
    count: number;
  }[];
  brands: {
    name: string;
    count: number;
  }[];
  materials: {
    name: string;
    count: number;
  }[];
};

export type SearchParamsI = {
  search?: string;
  brands?: string[];
  gender?: string;
  categories?: string[];
  colors?: string[];
  materials?: string[];
  showrooms?: string[];
  in_stock?: boolean;
};

export type CategoriesI = {
  name: string;
  count: number;
  image: string;
};
