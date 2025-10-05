// src/routes/admin.routes.js

import express from "express";
import {
  createAdmin,
  loginAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  logoutAdmin,
} from "../controllers/admin.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../utils/validate.js";
import {
  createAdminSchema,
  loginSchema,
  updateAdminSchema,
} from "../validations/admin.validation.js";

const router = express.Router();

// Public Routes
router.post("/login", validate(loginSchema), loginAdmin);

// Protected Routes
router.post("/logout", authenticate, logoutAdmin);

// Admin management routes (SUPER_ADMIN only)
router.post(
  "/",
  authenticate,
  authorize(["SUPER_ADMIN"]),
  validate(createAdminSchema),
  createAdmin
);

router.get(
  "/",
  authenticate,
  authorize(["SUPER_ADMIN"]),
  getAllAdmins
);

router.put(
  "/:id",
  authenticate,
  authorize(["SUPER_ADMIN"]),
  validate(updateAdminSchema),
  updateAdmin
);

router.delete(
  "/:id",
  authenticate,
  authorize(["SUPER_ADMIN"]),
  deleteAdmin
);

export default router;
