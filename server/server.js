import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import session from "express-session";
import MongoStore from "connect-mongo";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
      httpOnly: true,
      secure: false,
    },
  })
);

app.use("/api/jobs", jobRoutes);
app.use("/api", userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
