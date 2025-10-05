import { 
  createAdminService, 
  loginAdminService, 
  getAllAdminsService, 
  updateAdminService, 
  deleteAdminService 
} from "../services/admin.service.js";

/* Create admin (SUPER_ADMIN only) */
export const createAdmin = async (req, res) => {
  try {
    const admin = await createAdminService(req.body);
    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
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
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ message: "Login successful", admin });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

/*Get all admins */
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await getAllAdminsService();
    res.json(admins);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

/* Update admin (SUPER_ADMIN only) */
export const updateAdmin = async (req, res) => {
  try {
    const updated = await updateAdminService(req.params.id, req.body);
    res.json({ message: "Admin updated successfully", admin: updated });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

/* Delete admin (SUPER_ADMIN only) */
export const deleteAdmin = async (req, res) => {
  try {
    await deleteAdminService(req.params.id);
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

/* Logout admin (invalidate cookie */
export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};
