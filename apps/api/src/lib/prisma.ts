import { PrismaClient } from "@prisma/client";
import { withOptimize } from "@prisma/extension-optimize";

const prisma = new PrismaClient();

// const prisma = new PrismaClient({
//   log: ["query", "info", "warn", "error"],
// });

export default prisma;
