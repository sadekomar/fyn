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
  Register = "/register",
  ForgotPassword = "/forgot-password",
  ConfirmEmail = "/confirm-email",
  ResetPassword = "/reset-password",
  ResendVerificationEmail = "/resend-verification-email",
  ResendPasswordResetEmail = "/resend-password-reset-email",
  // user-data
  Order = "/order",
  Orders = "/orders",
  CartItem = "/cart-item",
  CartItems = "/cart-items",
  CartItemById = "/cart-item/:id",
  User = "/user/:id",
  Address = "/address",
  Addresses = "/addresses/:userId",
  // applicants
  Applicants = "/applicants",
  ApplicantById = "/applicant/:id",
}
