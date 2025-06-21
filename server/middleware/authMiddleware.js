import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.header.authorization;

  if (!authHeader || !authHeader.startWith("Bearer ")) {
    return res.status(500).join({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: decode.userId };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};
