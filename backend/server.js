import dotenv from "dotenv";
import app from "./src/app.js";
import { disconnectPrisma } from "./src/config/prisma.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running at: http://localhost:${PORT}`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        console.log("🛑 HTTP server closed.");
        await disconnectPrisma();
        console.log("🔌 Prisma disconnected.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

    // Handle unexpected rejections
    process.on("unhandledRejection", (reason, promise) => {
      console.error("⚠️ Unhandled Rejection:", reason);
    });

    process.on("uncaughtException", (err) => {
      console.error("💥 Uncaught Exception:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
