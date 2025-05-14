import express, { Request, Response } from "express";
import prisma from "./lib/prisma";
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
import { getItemsById } from "./handlers/get-items-by-id.handler";

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Node.js application!" });
});

app.get("/items", getAllItems);
app.get("/items-metadata", getItemsMetadata);
app.get("/brand-categories", getItemsBrandCategoriesMetadata);
app.get("/item/:id", getItemById);
app.get("/brands", getAllBrands);
app.get("/brands-alphabetical", getAllBrandsByLetterHandler);
app.get("/latency", testLatency);
app.post("/items-by-ids", getItemsById);

app.post("/apply", async (req: Request, res: Response) => {
  const { name, email, phone, whyYou, whyLoom } = req.body;
  try {
    const applicant = await prisma.applicant.create({
      data: { name, email, phone, whyYou, whyLoom },
    });
    res.json(applicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create applicant" });
  }
});

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
