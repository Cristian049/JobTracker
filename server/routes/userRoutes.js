import express from "express";

import { login, register, getUser, logout } from "../controllers/users.js";
const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.get("/user", getUser);

export default router;
