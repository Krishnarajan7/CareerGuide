import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { ValidationError, NotFoundError } from "../utils/errors.js";

// Ensure JWT_SECRET is defined
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment variables!");

// Helper: Create JWT tokens
const createToken = (admin) => {
  const payload = { id: admin.id, email: admin.email, role: admin.role };
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

/* Create a new admin (transactional) */
export const createAdminService = async (data) => {
  const { password, ...adminData } = data;

  return await prisma.$transaction(async (prismaTx) => {
    // Check for existing admin
    const existingAdmin = await prismaTx.admin.findUnique({
      where: { email: adminData.email },
    });
    if (existingAdmin) {
      throw new ValidationError("Admin already exists with this email");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await prismaTx.admin.create({
      data: { ...adminData, password: hashedPassword },
    });

    return { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
  });
};

/* Login admin */
export const loginAdminService = async ({ email, password }) => {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    throw new ValidationError("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);
  if (!passwordMatch) {
    throw new ValidationError("Invalid email or password");
  }

  const { accessToken, refreshToken } = createToken(admin);

  return { 
    accessToken, 
    refreshToken, 
    admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } 
  };
};

/* Get all admins */
export const getAllAdminsService = async () => {
  return prisma.admin.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
};

/* Update an admin */
export const updateAdminService = async (id, updates) => {
  const adminId = parseInt(id);
  if (isNaN(adminId)) {
    throw new ValidationError("Invalid admin ID");
  }

  const data = {};

  if (updates.name) data.name = updates.name;
  if (updates.email) data.email = updates.email;
  if (updates.role) data.role = updates.role;
  if (updates.password) data.password = await bcrypt.hash(updates.password, 10);

  if (Object.keys(data).length === 0) {
    throw new ValidationError("No valid fields provided for update");
  }

  // Check email uniqueness if email is being updated
  if (updates.email) {
    const existingAdmin = await prisma.admin.findUnique({ where: { email: updates.email } });
    if (existingAdmin && existingAdmin.id !== adminId) {
      throw new ValidationError("Another admin with this email already exists");
    }
  }

  try {
    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    return updatedAdmin;
  } catch (err) {
    if (err.code === "P2025") {
      throw new NotFoundError("Admin not found");
    }
    throw err; // unexpected errors
  }
};

/* Delete an admin */
export const deleteAdminService = async (id) => {
  const adminId = parseInt(id);
  if (isNaN(adminId)) {
    throw new ValidationError("Invalid admin ID");
  }

  try {
    await prisma.admin.delete({ where: { id: adminId } });
    return true;
  } catch (err) {
    if (err.code === "P2025") {
      throw new NotFoundError("Admin not found");
    }
    throw err;
  }
};

/* Get current admin */
export const getCurrentAdminService = async (adminId) => {
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  if (!admin) {
    throw new NotFoundError("Admin not found");
  }

  return admin;
};