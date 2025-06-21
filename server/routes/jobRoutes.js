import express from "express";
import { getAllJobs } from "../controllers/jobController";
import { authenticateUser } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", authenticateUser, getAllJobs);

export default router;
