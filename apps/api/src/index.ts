import express from "express";
import { prisma } from "@repo/database";
import cors from "cors";

import { Endpoints } from "./types/endpoints.js";
import { testLatency } from "./handlers/checks/test-latency";
import { healthCheck } from "./handlers/checks/health-check";
import {
  confirmEmail,
  login,
  register,
  resendVerificationEmail,
} from "./handlers/auth";
import {
  createCartItem,
  deleteCartItem,
  readCartItems,
  updateCartItem,
} from "./handlers/cart/cart";
import {
  readUser,
  readUserCheckout,
  createUser,
  updateUser,
  deleteUser,
} from "./handlers/user/user";
import {
  createOrder,
  readOrder,
  readOrders,
  updateOrder,
  deleteOrder,
} from "./handlers/order/order";
import {
  readAddress,
  createAddress,
  deleteAddress,
} from "./handlers/address/address";
import {
  createApplicant,
  readApplicant,
  readApplicants,
  updateApplicant,
  deleteApplicant,
} from "./handlers/applicant/applicant";
import {
  readCategories,
  readPopularCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  readMoreCategories,
} from "./handlers/category/category";
import {
  createItem,
  deleteItem,
  readItem,
  readItems,
  readCategoriesWithImages,
  readItemsMetadata,
  readItemsByIds,
  readOnSale,
  readItemsSearch,
} from "./handlers/item/item";
import { createNewsletter } from "./handlers/newsletter/create-newsletter";
import {
  readBrand,
  readBrands,
  readBrandsByLetter,
} from "./handlers/brand/brand";
import { readOrderByNumber } from "./handlers/order/read-order";
import {
  createItemView,
  deleteItemViews,
  readItemViewsCount,
  readUserItemViews,
} from "./handlers/item-view/item-view";
import {
  createBrandView,
  readBrandViewsCount,
  readUserBrandViews,
} from "./handlers/brand-view/brand-view";
import {
  createCategoryView,
  readCategoryViewsCount,
  readUserCategoryViews,
} from "./handlers/category-view/category-view";
import { createGuestUser } from "./handlers/guest-user/guest-user";
import { createLike, readLike, readLikes } from "./handlers/like/like";
import {
  createBrandFollow,
  readFollowedBrands,
} from "./handlers/brand-follow/brand-follow";
const app = express();
const PORT: number = parseInt(process.env.PORT || "3000");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get(Endpoints.Health, healthCheck);
app.get(Endpoints.Latency, testLatency);

// Guest user
app.post(Endpoints.GuestUser, createGuestUser);

// Items
app.get(Endpoints.Items, readItems);
app.get(Endpoints.ItemsMetadata, readItemsMetadata);
app.get(Endpoints.BrandCategories, readCategoriesWithImages);
app.get(Endpoints.ItemById, readItem);
app.post(Endpoints.ItemsByIds, readItemsByIds);
app.get(Endpoints.ItemsOnSale, readOnSale);

// Categories
app.get(Endpoints.Categories, readCategories);
app.get(Endpoints.PopularCategories, readPopularCategories);
app.get(Endpoints.MoreCategories, readMoreCategories);
app.post(Endpoints.Categories, createCategory);
app.put(Endpoints.CategoryById, updateCategory);
app.delete(Endpoints.CategoryById, deleteCategory);

// Brands
app.get(Endpoints.BrandByName, readBrand);
app.get(Endpoints.Brands, readBrands);
app.get(Endpoints.BrandsAlphabetical, readBrandsByLetter);

// views
app.post(Endpoints.ItemView, createItemView);
app.get(Endpoints.ItemViews, readUserItemViews);
app.get(Endpoints.ItemViewsCount, readItemViewsCount);
app.delete(Endpoints.ItemViews, deleteItemViews);

app.post(Endpoints.BrandView, createBrandView);
app.get(Endpoints.UserBrandViews, readUserBrandViews);
app.get(Endpoints.BrandViewsCount, readBrandViewsCount);
app.post(Endpoints.CategoryView, createCategoryView);
app.get(Endpoints.UserCategoryViews, readUserCategoryViews);
app.get(Endpoints.CategoryViewsCount, readCategoryViewsCount);

// itemCart
app.post(Endpoints.CartItem, createCartItem);
app.get(Endpoints.CartItems, readCartItems);
app.put(Endpoints.CartItemById, updateCartItem);
app.delete(Endpoints.CartItemById, deleteCartItem);

// likes
app.post(Endpoints.Like, createLike);
app.get(Endpoints.Like, readLike);
app.get(Endpoints.Likes, readLikes);

// brand follow
app.post(Endpoints.FollowedBrand, createBrandFollow);
app.get(Endpoints.FollowedBrands, readFollowedBrands);

app.post(Endpoints.Order, createOrder);
app.get(Endpoints.OrderById, readOrder);
app.get(Endpoints.OrderByNumber, readOrderByNumber);
app.get(Endpoints.OrdersByUserId, readOrders);
app.put(Endpoints.OrderById, updateOrder);
app.delete(Endpoints.OrderById, deleteOrder);

// Auth
app.post(Endpoints.Login, login);
app.get(Endpoints.ConfirmEmail, confirmEmail);
app.post(Endpoints.ResendVerificationEmail, resendVerificationEmail);

// user
app.post(Endpoints.User, createUser);
app.get(Endpoints.UserById, readUser);
app.get(Endpoints.UserCheckoutById, readUserCheckout);
app.put(Endpoints.UserById, updateUser);
app.delete(Endpoints.UserById, deleteUser);

app.get(Endpoints.Addresses, readAddress);
app.get(Endpoints.Address, createAddress);

// lists
app.post(Endpoints.Newsletter, createNewsletter);

// applicants
app.post(Endpoints.Apply, createApplicant);
app.get(Endpoints.Applicants, readApplicants);
app.get(Endpoints.ApplicantById, readApplicant);
app.put(Endpoints.ApplicantById, updateApplicant);
app.delete(Endpoints.ApplicantById, deleteApplicant);

app.get(Endpoints.ItemsSearch, readItemsSearch);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port http://0.0.0.0:${PORT} and more`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
