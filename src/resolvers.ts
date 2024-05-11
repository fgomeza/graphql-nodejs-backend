import Task from "./models/Task.js";
import User from "./models/User.js";

export default {
  Query: {
    async task(parent, { id }, context) {
      return await Task.findById(id);
    },
    async tasks() {
      return await Task.find();
    },
    async user(parent, { id }, context) {
      return await User.findById(id);
    },
    async users() {
      return await User.find();
    },
  },
  Mutation: {
    async addTask(parent, { task }) {
      const newTask = new Task({
        title: task.title,
      });

      await newTask.save();

      return newTask;
    },
    async createUser(parent, { email, password }) {
      const newUser = new User({
        email,
        password
      })

      await newUser.save()

      return newUser
    },
    async deleteTask(parent, { id }) {
      return await Task.findByIdAndDelete(id);
    },
    async updateTask(parent, { id, edits }) {
      const task = await Task.findByIdAndUpdate(
        id,
        {
          $set: {
            ...(edits.title && { title: edits.title }),
          },
        },
        { new: true }
      );

      return task;
    },
    async updateUser(parent, { id, edits }) {
      const task = await Task.findByIdAndUpdate(
        id,
        {
          $set: {
            ...(edits.name && { name: edits.name }),
            ...(edits.email && { email: edits.email }),
            ...(edits.password && { password: edits.password }),
            ...(edits.verified && { verified: edits.verified }),
          },
        },
        { new: true }
      );

      return task;
    },
  },
};
