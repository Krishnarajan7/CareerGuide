import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import collegeRoutes from "./routes/college.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import jobRoutes from "./routes/job.routes.js";
import { prisma } from "./config/prisma.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

// Parse JSON requests
app.use(express.json({ limit: "10mb" }));

// Health check route
app.get("/", async (req, res) => {
  try {
    const [collegeCount, adminCount, jobCount] = await Promise.all([
      prisma.college.count().catch(() => 0),
      prisma.admin.count().catch(() => 0),
      prisma.job.count().catch(() => 0),
    ]);

    res.json({
      message: "P2P API Server is running!",
      status: "healthy",
      dataset: {
        colleges: collegeCount,
        admins: adminCount,
        jobs: jobCount,
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
app.use("/api/jobs", jobRoutes);

// Error handling
app.use(errorHandler);
app.use(notFoundHandler);

export default app;