export type BrandsList = { name: string; id: string }[];

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
  genders:
    | {
        name: string;
        count: number;
      }[]
    | [];
  categories:
    | {
        name: string;
        count: number;
      }[]
    | [];
  colors: {
    name: string;
    count: number;
  }[];
  brands:
    | {
        name: string;
        count: number;
      }[]
    | [];
  materials:
    | {
        name: string;
        count: number;
      }[]
    | [];
};

export type CategoriesI = {
  name: string;
  count: number;
  image: string;
};

type LoginSuccessResponse = {
  status: "success";
  message: string;
  data: {
    userId: string;
    isEmailConfirmed: boolean;
  };
};

type LoginErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
