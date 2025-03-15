import express, { Request, Response } from "express";
import { prisma } from "./lib/prisma";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

// Middleware
const corsOptions = {
  origin: "*", // This already allows any origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Node.js application!" });
});

app.post("/apply", async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;
  console.log("--------------------------");
  console.log(req.body);
  console.log(name, email, phone, message);
  console.log("--------------------------");
  try {
    const applicant = await prisma.applicant.create({
      data: { name, email, phone, message },
    });
    res.json(applicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create applicant" });
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
