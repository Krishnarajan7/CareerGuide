import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.get("/", async (req, res) => {
  const total = await prisma.college.count().catch(() => 0);
  res.json({ message: "CareerGuide API Server is running!", status: "healthy", dataset: total });
});


app.get("/api/colleges", async (req, res) => {
  try {
    const { search, type, location, limit = 20, offset = 0 } = req.query;
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } },
        { type: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (type) where.type = { contains: type, mode: 'insensitive' };
    if (location) {
      where.OR = (where.OR || []).concat([
        { city: { contains: location, mode: 'insensitive' } },
        { state: { contains: location, mode: 'insensitive' } },
        { address: { contains: location, mode: 'insensitive' } }
      ]);
    }
    const take = parseInt(limit);
    const skip = parseInt(offset);
    const [data, total] = await Promise.all([
      prisma.college.findMany({ where, take, skip, orderBy: { id: 'asc' } }),
      prisma.college.count({ where })
    ]);
    res.json({ success: true, data, total });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

app.get("/api/colleges/search", async (req, res) => {
  try {
    const { q, type, location, limit = 10 } = req.query;
    if (!q && !type && !location) return res.json({ success: true, data: [], message: "Please provide search parameters" });
    const where = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { city: { contains: q, mode: 'insensitive' } },
        { state: { contains: q, mode: 'insensitive' } },
        { type: { contains: q, mode: 'insensitive' } }
      ];
    }
    if (type) where.type = { contains: type, mode: 'insensitive' };
    if (location) {
      where.OR = (where.OR || []).concat([
        { city: { contains: location, mode: 'insensitive' } },
        { state: { contains: location, mode: 'insensitive' } },
        { address: { contains: location, mode: 'insensitive' } }
      ]);
    }
    const take = parseInt(limit);
    const data = await prisma.college.findMany({ where, take, orderBy: { id: 'asc' } });
    res.json({ success: true, data, total: data.length });
  } catch (error) {
    console.error("Error searching colleges:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

app.get("/api/colleges/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const college = await prisma.college.findUnique({ where: { id: parseInt(id) } });
    if (!college) return res.status(404).json({ success: false, message: "College not found" });
    res.json({ success: true, data: college });
  } catch (error) {
    console.error("Error fetching college:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found"
  });
});

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/colleges`);
});
