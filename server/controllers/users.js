import User from "../models/User.js";
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ username, email, password });

  req.session.userId = user._id;

  res.status(201).json({ message: "Registered", user: req.session.userId });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await user.comparePassword(password);
  if (!match)
    return res.status(400).json({ message: "Email or password not valid" });

  req.session.userId = user._id;

  res.status(200).json({ message: "Logged in", user: req.session.userId });
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout error" });
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out" });
  });
};

export const getUser = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not logged in", user: null });
  }
  try {
    const user = await User.findById(req.session.userId).select("-password");
    if (!user)
      return res.status(404).json({ message: "User not found", user: null });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", user: null });
  }
};
