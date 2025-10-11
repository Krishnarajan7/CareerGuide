import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UnauthorizedError, ForbiddenError } from "../utils/errors.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment variables");

/* Authenticate admin via JWT (cookie or Authorization header) */
export const authenticate = (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    // Check cookies first (accessToken or refreshToken)
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    } else if (req.cookies?.refreshToken) {
      token = req.cookies.refreshToken;
    } 
    // Then Authorization header
    else if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7); // Extract token after "Bearer "
    }

    if (!token) {
      throw new UnauthorizedError("Access denied. No token provided.");
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

/*
 * Role-based authorization middleware
 * @param {Array<string>} roles - Array of roles allowed to access the route
 */
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.admin) {
      throw new UnauthorizedError("Unauthorized: admin info missing");
    }

    if (roles.length > 0 && !roles.includes(req.admin.role)) {
      throw new ForbiddenError("Forbidden: insufficient permissions");
    }

    next();
  };
};