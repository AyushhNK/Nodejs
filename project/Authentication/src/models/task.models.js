import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {type: Boolean, default: false},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  });

const TaskModel = mongoose.model("Task", taskSchema);
export default TaskModel;