# @repo/database

Shared database package for the Fyn monorepo using Prisma ORM.

## Overview

This package contains the Prisma schema, migrations, and a configured PrismaClient instance that can be shared across all applications in the monorepo.

## Usage

### In your applications

Import the Prisma client and types from the package:

```typescript
import { prisma, User, Item, Order } from "@repo/database";

// Use the prisma client
const users = await prisma.user.findMany();

// Use the types
const createUser = async (userData: User) => {
  // ...
};
```

## Scripts

Run these scripts from the project root using Turbo:

### Generate Prisma Client

```bash
pnpm turbo db:generate
```

### Create and apply migrations

```bash
pnpm turbo db:migrate
```

### Deploy migrations (production)

```bash
pnpm turbo db:deploy
```

### Open Prisma Studio

```bash
cd packages/database
pnpm db:studio
```

## Environment Variables

Make sure `DATABASE_URL` is set in your environment:

```env
DATABASE_URL="postgresql://..."
```

## Structure

```
packages/database/
├── prisma/
│   ├── schema.prisma       # Prisma schema definition
│   └── migrations/         # Database migrations
├── src/
│   ├── client.ts          # PrismaClient instance
│   └── index.ts           # Exports for the package
├── generated/             # Generated Prisma Client (gitignored)
├── package.json
├── tsconfig.json
└── README.md
```

## Notes

- The generated Prisma Client is output to `generated/prisma` and is gitignored
- The PrismaClient instance uses singleton pattern to prevent multiple instances
- All Prisma types are re-exported for easy consumption in apps
