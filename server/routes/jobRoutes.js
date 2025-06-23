import express from "express";
import { index } from "../controllers/jobController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", index);

export default router;
