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
  colors: string[];
  gender: string;
  material: string;
  sizes: {
    name: string;
    available: boolean;
  }[];
};

export type MetadataI = {
  count: number;
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
