// scripts/createSuperAdmin.js
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

const createSuperAdmin = async () => {
  try {
    const email = "p2padmin@gmail.com"; 
    const password = "Admin123";          
    const name = "Super Admin";

    // Check if SUPER_ADMIN already exists
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      console.log("⚠️ SUPER_ADMIN already exists:", email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "SUPER_ADMIN",
      },
    });

    console.log("✅ SUPER_ADMIN created successfully!");
    console.log("Email:", admin.email);
    console.log("Password:", password); // Only show once for setup
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create SUPER_ADMIN:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

createSuperAdmin();
