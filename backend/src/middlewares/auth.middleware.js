import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment variables");

/* Authenticate admin via JWT (cookie or Authorization header) */
export const authenticate = (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

/*
 * Role-based authorization middleware
 * @param {Array<string>} roles - Array of roles allowed to access the route
 */
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ message: "Unauthorized: admin info missing" });
    }

    if (roles.length > 0 && !roles.includes(req.admin.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }

    next();
  };
};
