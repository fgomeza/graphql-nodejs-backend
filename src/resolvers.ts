import fs from "fs";
import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import Task from "./models/Task.js";
import User from "./models/User.js";

let db = JSON.parse(fs.readFileSync("_db.json", "utf8"));

const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
  }),
});

export default {
  Query: {
    tasks() {
      return db.tasks;
      //   return Task.find();
    },
    task(parent, args, context) {
      return db.tasks.find(({ id }) => id === args.id);
    //   return Task.findById(args.id);
    },
  },
  Mutation: {
    deleteTask(_, args) {
      db.tasks = db.tasks.filter((g) => g.id !== args.id);
      fs.writeFileSync("_db.json", JSON.stringify(db, null, 4));

      return db.tasks;
    },
    addTask(_, { task }) {
      let newTask = {
        id: Math.floor(Math.random() * 10000).toString(),
        title: task.title,
        platform: task.platform,
      };
      db.tasks.push(newTask);
      fs.writeFileSync("_db.json", JSON.stringify(db, null, 4));

      return newTask;
    },
    updateTask(_, { id, edits }) {
      let task = db.tasks.find((g) => g.id === id);
      if (edits.title) {
        task.title = edits.title;
      }
      if (edits.platform) {
        task.platform = edits.platform;
      }
      fs.writeFileSync("_db.json", JSON.stringify(db, null, 4));

      return task;
    },
  },
};
