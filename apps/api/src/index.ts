import express, { Request, Response } from "express";
import prisma from "./helpers/prisma";
import cors from "cors";
import {
  getAllItems,
  getItemsBrandCategoriesMetadata,
  getItemsMetadata,
} from "./handlers/get-all-items.handler";
import {
  getAllBrands,
  getAllBrandsByLetterHandler,
} from "./handlers/get-all-brands.handler";
import { getItemById } from "./handlers/get-item.handler";
import { testLatency } from "./handlers/test-latency.handler";
import { getItemsByIds } from "./handlers/get-items-by-id.handler";
import { Resend } from "resend";
import {
  confirmEmail,
  login,
  register,
  resendVerificationEmail,
} from "./handlers/auth";
import { createApplicant } from "./handlers/create-applicant";
import { createOrder } from "./handlers/create-order";

const app = express();
const PORT = process.env.PORT;

export enum Endpoints {
  Welcome = "/",
  Health = "/health",
  Items = "/items",
  ItemsMetadata = "/items-metadata",
  BrandCategories = "/brand-categories",
  ItemById = "/item/:id",
  ItemsByIds = "/items-by-ids",
  Brands = "/brands",
  BrandsAlphabetical = "/brands-alphabetical",
  Latency = "/latency",
  Login = "/login",
  Register = "/register",
  ConfirmEmail = "/confirm-email",
  Apply = "/apply",
  Order = "/order",
  // TBD
  ForgotPassword = "/forgot-password",
  ResetPassword = "/reset-password",
  ResendVerificationEmail = "/resend-verification-email",
  ResendPasswordResetEmail = "/resend-password-reset-email",
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get(Endpoints.Health, (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.get(Endpoints.Welcome, (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Node.js application!" });
});

app.get(Endpoints.Items, getAllItems);
app.get(Endpoints.ItemsMetadata, getItemsMetadata);
app.get(Endpoints.BrandCategories, getItemsBrandCategoriesMetadata);
app.get(Endpoints.ItemById, getItemById);
app.post(Endpoints.ItemsByIds, getItemsByIds);

app.get(Endpoints.Brands, getAllBrands);
app.get(Endpoints.BrandsAlphabetical, getAllBrandsByLetterHandler);

app.get(Endpoints.Latency, testLatency);

app.post(Endpoints.Order, createOrder);

// Auth
app.post(Endpoints.Login, login);
app.post(Endpoints.Register, register);
app.get(Endpoints.ConfirmEmail, confirmEmail);
app.post(Endpoints.ResendVerificationEmail, resendVerificationEmail);

app.post(Endpoints.Apply, createApplicant);

app.post("/newsletter", async (req: Request, res: Response) => {
  const { email, type } = req.body;

  try {
    const newsletter = await prisma.newsletter.create({
      data: { email, type },
    });
    res.json(newsletter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create newsletter submission" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT} and more`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
