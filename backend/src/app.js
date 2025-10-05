import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import collegeRoutes from "./routes/college.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { prisma } from "./config/prisma.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", 
    credentials: true, // allow cookies
  })
);

app.use(cookieParser()); 

// Parse JSON requests
app.use(express.json({ limit: "10mb" }));

// Health check route
app.get("/", async (req, res) => {
  try {
    const collegeCount = await prisma.college.count().catch(() => 0);
    const adminCount = await prisma.admin.count().catch(() => 0);

    res.json({
      message: "CareerGuide API Server is running!",
      status: "healthy",
      dataset: {
        colleges: collegeCount,
        admins: adminCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dataset counts",
      status: "unhealthy",
      error: error.message,
    });
  }
});

// API routes
app.use("/api/colleges", collegeRoutes);
app.use("/api/admins", adminRoutes);

// Error handling
app.use(errorHandler);
app.use(notFoundHandler);

export default app;
