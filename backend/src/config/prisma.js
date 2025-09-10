import { PrismaClient } from "@prisma/client";

// Ensure a single Prisma client instance across the app
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function disconnectPrisma() {
  try {
    await prisma.$disconnect();
  } catch (_) {
    // ignore disconnect errors
  }
}


