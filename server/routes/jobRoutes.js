import express from "express";
import { index, newJob } from "../controllers/jobController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", index);

router.get("/new", newJob);

export default router;
