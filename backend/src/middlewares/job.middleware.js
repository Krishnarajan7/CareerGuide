import jwt from 'jsonwebtoken';
import {prisma} from '../config/prisma.js';
import { NotFoundError, ValidationError, UnauthorizedError } from '../utils/errors.js';

// Middleware to authenticate requests using JWT
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authentication token missing or invalid'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true },
    });

    if (!admin) {
      return next(new UnauthorizedError('Admin not found'));
    }

    req.user = admin; // Attach admin data to request
    next();
  } catch (error) {
    return next(new UnauthorizedError('Invalid or expired token'));
  }
};

// Middleware to authorize admin role
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new UnauthorizedError('Access restricted to admins only'));
  }
  next();
};

// Middleware to validate job ID parameter
const validateJobId = (req, res, next) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  if (isNaN(parsedId) || parsedId <= 0) {
    return next(new ValidationError('Invalid job ID: must be a positive integer'));
  }
  req.params.id = parsedId; // Ensure ID is an integer
  next();
};

export { authenticate, authorizeAdmin, validateJobId };