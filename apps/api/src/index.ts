import express, { Request, Response } from "express";
import prisma from "./helpers/prisma";
import cors from "cors";
import {
  readItems,
  readCategoriesWithImages,
  readItemsMetadata,
} from "./handlers/read-items";
import { readBrands, readBrandsByLetter } from "./handlers/read-brands";
import { readItem } from "./handlers/read-item";
import { readItemsByIds } from "./handlers/read-items-by-ids";
import { testLatency } from "./handlers/checks/test-latency";

import {
  confirmEmail,
  login,
  register,
  resendVerificationEmail,
} from "./handlers/auth";
import { createApplicant } from "./handlers/lists/create-applicant";
import { createOrder } from "./handlers/order/create-order";
import { healthCheck } from "./handlers/checks/health-check";
import { Endpoints } from "./types/endpoints";
import { createNewsletter } from "./handlers/lists/create-newsletter";
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

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get(Endpoints.Health, healthCheck);
app.get(Endpoints.Latency, testLatency);

// Items/Categories
app.get(Endpoints.Items, readItems);
app.get(Endpoints.ItemsMetadata, readItemsMetadata);
app.get(Endpoints.BrandCategories, readCategoriesWithImages);
app.get(Endpoints.ItemById, readItem);
app.post(Endpoints.ItemsByIds, readItemsByIds);

// Categories
app.get(Endpoints.Categories, readCategories);

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

// Auth
app.post(Endpoints.Login, login);
app.post(Endpoints.Register, register);
app.get(Endpoints.ConfirmEmail, confirmEmail);
app.post(Endpoints.ResendVerificationEmail, resendVerificationEmail);

// lists
app.post(Endpoints.Apply, createApplicant);
app.post(Endpoints.Newsletter, createNewsletter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT} and more`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
