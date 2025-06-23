import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ username, email, password });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res
    .status(201)
    .json({ token, user: { username: user.username, email: user.email } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await user.comparePassword(password);
  if (!match)
    return res.status(400).json({ message: "Email or password not valid" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res
    .status(200)
    .json({ token, user: { username: user.username, email: user.email } });
};
