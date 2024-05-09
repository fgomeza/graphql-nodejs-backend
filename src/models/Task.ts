import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
});

export default mongoose.model("Task", TaskSchema);
