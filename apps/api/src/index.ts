import express from "express";
import prisma from "./helpers/prisma";
import cors from "cors";
import {
  readItems,
  readCategoriesWithImages,
  readItemsMetadata,
} from "./handlers/read-items";
import { readBrands, readBrandsByLetter } from "./handlers/brands/read-brands";
import { readItem } from "./handlers/read-item";
import { readItemsByIds } from "./handlers/read-items-by-ids";
import { testLatency } from "./handlers/checks/test-latency";
import {
  confirmEmail,
  login,
  register,
  resendVerificationEmail,
} from "./handlers/auth";
import { createApplicant } from "./handlers/applicants/create-applicant";
import { createOrder } from "./handlers/order/create-order";
import { healthCheck } from "./handlers/checks/health-check";
import { Endpoints } from "./types/endpoints";
import { createNewsletter } from "./handlers/newsletter/create-newsletter";
import {
  createCartItem,
  deleteCartItem,
  readCartItems,
  updateCartItem,
} from "./handlers/order/cart";
import { readOrder } from "./handlers/order/read-order";
import { updateOrder } from "./handlers/order/update-order";
import { deleteOrder } from "./handlers/order/delete-order";
import { readOrders } from "./handlers/order/read-orders";
import { readUser } from "./handlers/user/read-user";
import { readAddress } from "./handlers/address/read-addresses";
import { readCategories } from "./handlers/categories/read-categories";
import { deleteUser } from "./handlers/user/delete-user";
import { createUser } from "./handlers/user/create-user";
import { updateUser } from "./handlers/user/update-user";
import { readApplicants } from "./handlers/applicants/read-applicants";
import { readApplicant } from "./handlers/applicants/read-applicant";
import { updateApplicant } from "./handlers/applicants/update-applicant";
import { deleteApplicant } from "./handlers/applicants/delete-applicant";
import { createCategory } from "./handlers/categories/create-category";
import { updateCategory } from "./handlers/categories/update-category";
import { deleteCategory } from "./handlers/categories/delete-category";
import { createAddress } from "./handlers/address/create-address";

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
