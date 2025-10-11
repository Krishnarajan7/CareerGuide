import { 
  createAdminService, 
  loginAdminService, 
  getAllAdminsService, 
  updateAdminService, 
  deleteAdminService,
  getCurrentAdminService
} from "../services/admin.service.js";

/* Create admin (SUPER_ADMIN only) */
export const createAdmin = async (req, res, next) => {
  try {
    const admin = await createAdminService(req.body);
    return res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    next(error);
  }
};

/* Login admin */
export const loginAdmin = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, admin } = await loginAdminService(req.body);

    // Set secure HTTP-only cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ 
      message: "Login successful", 
      accessToken, 
      refreshToken, 
      admin 
    });
  } catch (error) {
    next(error);
  }
};

/* Get all admins (SUPER_ADMIN only) */
export const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await getAllAdminsService();
    return res.json(admins);
  } catch (error) {
    next(error);
  }
};

/* Update admin (SUPER_ADMIN only) */
export const updateAdmin = async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid admin ID" });
  }

  try {
    const updated = await updateAdminService(id, req.body);
    return res.json({ message: "Admin updated successfully", admin: updated });
  } catch (error) {
    next(error);
  }
};

/* Delete admin (SUPER_ADMIN only) */
export const deleteAdmin = async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid admin ID" });
  }

  try {
    await deleteAdminService(id);
    return res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/* Logout admin (invalidate cookies) */
export const logoutAdmin = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
    });
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

/* Get currently logged-in admin (/api/admins/me) */
export const getCurrentAdmin = async (req, res, next) => {
  try {
    const admin = await getCurrentAdminService(req.admin.id);
    return res.json(admin);
  } catch (error) {
    next(error);
  }
};