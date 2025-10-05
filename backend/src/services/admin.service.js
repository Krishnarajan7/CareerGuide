import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

// Ensure JWT_SECRET is defined
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment variables!");

// Helper: Create JWT token
const createToken = (admin) => {
  return jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// --- SERVICE FUNCTIONS ---

/*Create a new admin (transactional) */
export const createAdminService = async (data) => {
  const { password, role = "ADMIN", ...adminData } = data;

  return await prisma.$transaction(async (prismaTx) => {
    // Check for existing admin
    const existingAdmin = await prismaTx.admin.findUnique({
      where: { email: adminData.email },
    });
    if (existingAdmin) {
      const error = new Error("Admin already exists with this email");
      error.status = 400;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await prismaTx.admin.create({
      data: { ...adminData, password: hashedPassword, role },
    });

    return { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
  });
};

/* Login admin */
export const loginAdminService = async ({ email, password }) => {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);
  if (!passwordMatch) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const token = createToken(admin);

  return { token, admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } };
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
  const data = {};

  if (updates.name) data.name = updates.name;
  if (updates.email) data.email = updates.email;
  if (updates.role) data.role = updates.role;
  if (updates.password) data.password = await bcrypt.hash(updates.password, 10);

  if (Object.keys(data).length === 0) {
    const error = new Error("No valid fields provided for update");
    error.status = 400;
    throw error;
  }

  try {
    const updatedAdmin = await prisma.admin.update({
      where: { id: parseInt(id) },
      data,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    return updatedAdmin;
  } catch (err) {
    if (err.code === "P2025") {
      const error = new Error("Admin not found");
      error.status = 404;
      throw error;
    }
    throw err; // unexpected errors
  }
};

/* Delete an admin */
export const deleteAdminService = async (id) => {
  try {
    await prisma.admin.delete({ where: { id: parseInt(id) } });
    return true;
  } catch (err) {
    if (err.code === "P2025") {
      const error = new Error("Admin not found");
      error.status = 404;
      throw error;
    }
    throw err; 
  }
};
