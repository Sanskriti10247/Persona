import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import chatRouter from "./routes/chat.js";

// Prefer a .env in the repo root (one level up) if present; fall back to backend/.env
const rootEnv = path.resolve(process.cwd(), "..", ".env");
dotenv.config({ path: rootEnv, override: false });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/chat", chatRouter);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Keep the server alive
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
