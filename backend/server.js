import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

import { userRoutes } from "./APIs/user-api.js";
import { historyRoutes } from "./APIs/history-api.js";
import { questionsRoutes } from "./APIs/questions-api.js";
import { verifyToken } from "./middlewares/verifyToken.js";

const app = express();
const PORT = process.env.PORT || 8080;

/* ================================
   __dirname support for ES modules
================================ */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================================
   Middlewares
================================ */

app.use(morgan("dev"));

app.use(express.json());

const allowedOrigins = [
  "https://skillcheck-ai-project-groq-1.onrender.com",
  "https://skillcheck-ai-project-groq.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(cookieParser());

/* ================================
   API Routes
================================ */

app.use("/user-api", userRoutes);
app.use("/questions-api", verifyToken, questionsRoutes);
app.use("/history-api", verifyToken, historyRoutes);

/* ================================
   Serve React Frontend
================================ */

app.use(express.static(path.join(__dirname, "../frontend/dist")));

/* ================================
   React Router Fix (IMPORTANT)
================================ */

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

/* ================================
   Database Connection
================================ */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed:", err.message);
  });
