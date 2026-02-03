import TaskModel from "../models/task.models";
import { authenticateToken } from "../middleware/auth.middleware";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;
    const newTask = new TaskModel({
      title,
      description,
      userId
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await TaskModel.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};