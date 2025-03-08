import express, { Request, Response } from "express";
import { prisma } from "./lib/prisma";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Node.js application!" });
});

app.post("/apply", async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;
  const applicant = await prisma.applicant.create({
    data: { name, email, phone, message },
  });
  res.json(applicant);
});

// Example route using Prisma
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
