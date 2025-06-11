export enum Endpoints {
  Items = "/items",
  ItemsMetadata = "/items-metadata",
  BrandCategories = "/brand-categories",
  ItemById = "/item/:id",
  ItemsByIds = "/items-by-ids",
  // brands
  Brands = "/brands",
  BrandsAlphabetical = "/brands-alphabetical",
  // categories
  Categories = "/categories",
  CategoryById = "/categories/:id",
  // checks
  Latency = "/latency",
  Health = "/health",
  // lists
  Newsletter = "/newsletter",
  Apply = "/apply",
  // auth
  Login = "/login",
  ForgotPassword = "/forgot-password",
  ConfirmEmail = "/confirm-email",
  ResetPassword = "/reset-password",
  ResendVerificationEmail = "/resend-verification-email",
  ResendPasswordResetEmail = "/resend-password-reset-email",
  // user-data
  User = "/user",
  UserById = "/user/:id",
  UserCheckoutById = "/user-checkout/:id",
  Order = "/order",
  OrderById = "/order/:id",
  OrdersByUserId = "/orders/:userId",
  CartItem = "/cart-item",
  CartItemsByUserId = "/cart-items/:userId",
  CartItemById = "/cart-item/:id",
  Address = "/address",
  Addresses = "/addresses/:userId",
  // applicants
  Applicants = "/applicants",
  ApplicantById = "/applicant/:id",
}
