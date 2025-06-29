import Job from "../models/Job.js";

export const index = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const newJob = async (req, res) => {
  try {
    const { company, position, status } = req.body;
    const job = await new Job.create({ company, position, status });
  } catch (e) {
    console.error(e.message);
  }
};
