import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from './modules/auth/auth.routes'
dotenv.config();


import { prisma } from "./config/db";

const app = express();

app.use(cors());
app.use(express.json());

// Test root route
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});
app.use('/api/auth',authRoutes)
// Test DB connection at startup
async function testDbConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}
testDbConnection();

// Health check route
app.get("/api/health", async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1;`;
    res.status(200).json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("DB Health Check Failed:", error);
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("server running on port", process.env.PORT || 4000);
});
