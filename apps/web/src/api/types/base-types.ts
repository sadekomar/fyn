export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNISEX = "UNISEX",
  KIDS = "KIDS",
}

export interface Item {
  id: string;
  name: string;
  description: string;
  latestPrice: number;
  link: string;
  brand: Brand;
  brandId: string;
  material?: Material;
  materialId?: string;
  gender?: Gender;
  deletedAt?: Date;
  inTrash: boolean;
  createdAt: Date;
  updatedAt: Date;
  categories: Category[];
  colors: Color[];
  images: Image[];
  sizes: Size[];
  prices: Price[];
  views: ItemView[];
  likes: Like[];
  carts: ItemCart[];
  orders: ItemOrder[];
}

export interface ItemView {
  id: string;
  user: User;
  userId: string;
  item: Item;
  itemId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryView {
  id: string;
  user: User;
  userId: string;
  category: Category;
  categoryId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandView {
  id: string;
  user: User;
  userId: string;
  brand: Brand;
  brandId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Like {
  id: string;
  user: User;
  userId: string;
  item: Item;
  itemId: string;
  createdAt: Date;
}

export interface Price {
  id: string;
  price: number;
  createdAt: Date;
  item: Item;
  itemId: string;
}

export interface Brand {
  id: string;
  name: string;
  description?: string;
  image?: string;
  logo?: string;
  items: Item[];
  brandViews: BrandView[];
  showrooms: Showroom[];
  shippingEstimates: ShippingEstimate[];
}

export interface Showroom {
  id: string;
  name: string;
  brands: Brand[];
}

export interface Category {
  id: string;
  name: string;
  items: Item[];
  categoryViews: CategoryView[];
}

export interface Color {
  id: string;
  name: string;
  items: Item[];
  itemOrders: ItemOrder[];
  itemCarts: ItemCart[];
}

export interface Image {
  id: string;
  url: string;
  item: Item;
  itemId: string;
  isThumbnail: boolean;
  createdAt: Date;
}

export interface Size {
  id: string;
  name: string;
  available: boolean;
  createdAt: Date;
  item: Item;
  itemId: string;
  itemCarts: ItemCart[];
  itemOrders: ItemOrder[];
}

export interface Material {
  id: string;
  name: string;
  items: Item[];
}

export enum ApplicantStatus {
  PENDING = "PENDING",
  EMAIL_SENT = "EMAIL_SENT",
  ONLINE_INTERVIEW_SCHEDULED = "ONLINE_INTERVIEW_SCHEDULED",
  ONLINE_INTERVIEW_COMPLETED = "ONLINE_INTERVIEW_COMPLETED",
  IN_PERSON_INTERVIEW_SCHEDULED = "IN_PERSON_INTERVIEW_SCHEDULED",
  IN_PERSON_INTERVIEW_COMPLETED = "IN_PERSON_INTERVIEW_COMPLETED",
  HIRED = "HIRED",
  REJECTED = "REJECTED",
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  whyYou: string;
  whyLoom: string;
  createdAt: Date;
  status: ApplicantStatus;
}

export enum NewsletterType {
  CAREERS = "CAREERS",
  NEWSLETTER = "NEWSLETTER",
}

export interface Newsletter {
  id: string;
  email: string;
  type: NewsletterType;
  createdAt: Date;
}

export interface Trash {
  id: string;
  link: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  isEmailConfirmed: boolean;
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  itemViews: ItemView[];
  categoryViews: CategoryView[];
  brandViews: BrandView[];
  likes: Like[];
  itemCarts: ItemCart[];
  orders: Order[];
  addresses: Address[];
  confirmationToken?: string;
  tokenExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum AddressType {
  NORMAL = "NORMAL",
  BILLING = "BILLING",
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  apartment?: string;
  city: string;
  governorate: string;
  country: string;
  postalCode?: string;
  createdAt: Date;
  orders: Order[];
  user: User;
  userId: string;
  addressType: AddressType;
}

export interface ItemCart {
  id: string;
  item: Item;
  itemId: string;
  quantity: number;
  size: Size;
  sizeId: string;
  color?: Color;
  colorId?: string;
  user: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: ItemOrder[];
  orderTotal: number;
  status: OrderStatus;
  user: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  phoneNumber: string;
  address: Address;
  addressId: string;
}

export interface ItemOrder {
  id: string;
  order: Order;
  orderId: string;
  item: Item;
  itemId: string;
  quantity: number;
  name: string;
  image: string;
  price: number;
  size: Size;
  sizeId: string;
  color?: Color;
  colorId?: string;
  shippingEstimate: ShippingEstimate;
  shippingEstimateId: string;
}

export interface ShippingEstimate {
  id: string;
  cost: number;
  brand: Brand;
  brandId: string;
  itemOrders: ItemOrder[];
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
