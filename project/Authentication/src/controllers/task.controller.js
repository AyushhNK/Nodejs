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

export const DeleteTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = req.params.id;
    const task = await TaskModel.findOneAndDelete({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const UpdateTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = req.params.id; 
    const { title, description, status } = req.body;
    const task = await TaskModel.findOneAndUpdate(
      { _id: taskId, userId },
      { title, description, status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};