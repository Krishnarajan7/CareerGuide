import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import collegeRoutes from "./routes/college.routes.js";
import { prisma } from "./config/prisma.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health route
app.get("/", async (req, res) => {
  const total = await prisma.college.count().catch(() => 0);
  res.json({ message: "CareerGuide API Server is running!", status: "healthy", dataset: total });
});

// API routes
app.use("/api/colleges", collegeRoutes);

// Error handling
app.use(errorHandler);
app.use(notFoundHandler);

export default app;


