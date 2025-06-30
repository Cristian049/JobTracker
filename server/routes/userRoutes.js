import express from "express";
import User from "../models/User.js";

import { login, register, getUser } from "../controllers/users.js";
const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/user", getUser);

export default router;
