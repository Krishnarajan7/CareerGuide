import { 
  createAdminService, 
  loginAdminService, 
  getAllAdminsService, 
  updateAdminService, 
  deleteAdminService 
} from "../services/admin.service.js";
import { prisma } from "../config/prisma.js";

/* Create admin (SUPER_ADMIN only) */
export const createAdmin = async (req, res) => {
  try {
    const admin = await createAdminService(req.body);
    return res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

/* Login admin */
export const loginAdmin = async (req, res) => {
  try {
    const { token, admin } = await loginAdminService(req.body);

    // Set secure HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ message: "Login successful", admin });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

/* Get all admins (SUPER_ADMIN only) */
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await getAllAdminsService();
    return res.json(admins);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

/* Update admin (SUPER_ADMIN only) */
export const updateAdmin = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid admin ID" });
  }

  try {
    const updated = await updateAdminService(id, req.body);
    return res.json({ message: "Admin updated successfully", admin: updated });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

/* Delete admin (SUPER_ADMIN only) */
export const deleteAdmin = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid admin ID" });
  }

  try {
    await deleteAdminService(id);
    return res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

/* Logout admin (invalidate cookie) */
export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
    });
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

/* Get currently logged-in admin (/api/admins/me) */
export const getCurrentAdmin = async (req, res) => {
  try {
    if (!req.admin || !req.admin.id) {
      return res.status(401).json({ message: "Unauthorized: admin info missing" });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.json(admin);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch admin", error: error.message });
  }
};
