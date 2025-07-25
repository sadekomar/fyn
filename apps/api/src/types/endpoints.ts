export enum Endpoints {
  Items = "/items",
  ItemsMetadata = "/items-metadata",
  BrandCategories = "/brand-categories",
  ItemById = "/item/:id",
  ItemsByIds = "/items-by-ids",
  // brands
  Brands = "/brands",
  BrandsAlphabetical = "/brands-alphabetical",
  BrandByName = "/brand/:name",
  // categories
  Categories = "/categories",
  PopularCategories = "/popular-categories",
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
  // analytics
  GuestUser = "/guest-user",
  // user-data
  User = "/user",
  UserById = "/user/:id",
  UserCheckoutById = "/user-checkout/:id",
  Order = "/order",
  OrderById = "/order/:id",
  OrderByNumber = "/order-by-number/:orderNumber",
  OrdersByUserId = "/orders/:userId",
  CartItem = "/cart-item",
  CartItems = "/cart-items",
  CartItemById = "/cart-item/:id",
  Like = "/like",
  Likes = "/likes",
  Address = "/address",
  Addresses = "/addresses/:userId",
  FollowedBrand = "/followed-brand",
  FollowedBrands = "/followed-brands",
  // views
  ItemView = "/item-view",
  ItemViews = "/item-views",
  ItemViewsCount = "/item-views-count/:itemId",
  CategoryView = "/category-view",
  UserCategoryViews = "/user-category-views/:userId",
  CategoryViewsCount = "/category-views-count/:categoryId",
  BrandView = "/brand-view",
  UserBrandViews = "/user-brand-views/:userId",
  BrandViewsCount = "/brand-views-count/:brandId",
  // applicants
  Applicants = "/applicants",
  ApplicantById = "/applicant/:id",
  // recommendations
  Recommendations = "/recommendations",
}
