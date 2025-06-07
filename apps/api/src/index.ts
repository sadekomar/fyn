import express from "express";
import prisma from "./helpers/prisma";
import cors from "cors";

import { Endpoints } from "./types/endpoints";
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
  createCategory,
  updateCategory,
  deleteCategory,
} from "./handlers/category/category";
import {
  createItem,
  deleteItem,
  readItem,
  readItems,
  readCategoriesWithImages,
  readItemsMetadata,
  readItemsByIds,
} from "./handlers/item/item";
import { createNewsletter } from "./handlers/newsletter/create-newsletter";
import { readBrands, readBrandsByLetter } from "./handlers/brand/brand";

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get(Endpoints.Health, healthCheck);
app.get(Endpoints.Latency, testLatency);

// Items
app.get(Endpoints.Items, readItems);
app.get(Endpoints.ItemsMetadata, readItemsMetadata);
app.get(Endpoints.BrandCategories, readCategoriesWithImages);
app.get(Endpoints.ItemById, readItem);
app.post(Endpoints.ItemsByIds, readItemsByIds);

// Categories
app.get(Endpoints.Categories, readCategories);
app.post(Endpoints.Categories, createCategory);
app.patch(Endpoints.CategoryById, updateCategory);
app.delete(Endpoints.CategoryById, deleteCategory);

// Brands
app.get(Endpoints.Brands, readBrands);
app.get(Endpoints.BrandsAlphabetical, readBrandsByLetter);

// itemCart
app.post(Endpoints.CartItem, createCartItem);
app.get(Endpoints.CartItems, readCartItems);
app.patch(Endpoints.CartItemById, updateCartItem);
app.delete(Endpoints.CartItemById, deleteCartItem);

app.post(Endpoints.Order, createOrder);
app.get(Endpoints.Order, readOrder);
app.patch(Endpoints.Order, updateOrder);
app.delete(Endpoints.Order, deleteOrder);
app.get(Endpoints.Orders, readOrders);

// user
app.post(Endpoints.User, createUser);
app.get(Endpoints.User, readUser);
app.patch(Endpoints.User, updateUser);
app.delete(Endpoints.User, deleteUser);

app.get(Endpoints.Addresses, readAddress);
app.get(Endpoints.Address, createAddress);

// Auth
app.post(Endpoints.Login, login);
app.post(Endpoints.Register, register);
app.get(Endpoints.ConfirmEmail, confirmEmail);
app.post(Endpoints.ResendVerificationEmail, resendVerificationEmail);

// lists
app.post(Endpoints.Newsletter, createNewsletter);

// applicants
app.post(Endpoints.Apply, createApplicant);
app.get(Endpoints.Applicants, readApplicants);
app.get(Endpoints.ApplicantById, readApplicant);
app.patch(Endpoints.ApplicantById, updateApplicant);
app.delete(Endpoints.ApplicantById, deleteApplicant);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT} and more`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
