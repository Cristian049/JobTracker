import Job from "../models/Job.js";

export const getAllJobs = async (req, res) => {
  try {
    const userId = req.user.userId;

    const jobs = await Job.find({ createdBy: userId }).sort("-createdAt");
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).join({ message: "Server Error" });
  }
};
