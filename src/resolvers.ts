import jwt from "jsonwebtoken";
import Task from "./mongooseModels/Task.js";
import User from "./mongooseModels/User.js";

export default {
  Query: {
    async task(parent, { id }, context) {
      return await Task.findById(id);
    },
    async tasks(parent) {
      return await Task.find();
    },
    async user(parent, { id }, context) {
      return await User.findById(id);
    },
    async users(parent) {
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
    async createUser(parent, { user: { email, password } }) {
      const emailExists = await User.exists({ email });

      if (emailExists) {
        throw Error("User already exists!");
      } else {
        const user = new User({
          email,
          name: "",
          password,
          verified: false,
        });

        await user.save();

        const user1 = { ...user };

        const userToTokenize = {
          email: user.email,
          name: user.name,
          verified: user.verified,
        };

        const token = jwt.sign(userToTokenize, process.env.JWT_PRIVATE_KEY, {
          expiresIn: process.env.JWT_EXPIRY_TIME,
        });

        return {
          ...userToTokenize,
          jwt: token,
        };
      }
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
    async login(parent, { email, password }) {
      const user = await User.findOne({
        $and: [{ email }, { password }],
      });

      if (user) {
        const userToTokenize = {
          email: user.email,
          name: user.name,
          verified: user.verified,
        };

        const token = jwt.sign(userToTokenize, process.env.JWT_PRIVATE_KEY, {
          expiresIn: process.env.JWT_EXPIRY_TIME,
        });

        return {
          ...userToTokenize,
          jwt: token,
        };
      }

      throw Error("Invalid Email or password");
    },
    async updateUser(parent, { id, edits }) {
      const user = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            ...(typeof edits.name !== "undefined" && {
              name: edits.name,
            }),
            ...(typeof edits.email !== "undefined" && {
              email: edits.email,
            }),
          },
        },
        { new: true }
      );

      return user;
    },
  },
};
