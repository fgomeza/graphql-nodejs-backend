import { GraphQLError } from "graphql";
import { rule, shield } from "graphql-shield";

const isAuthenticated = rule()((parent, args, { user }) => {
  if (user == null) return new GraphQLError("UNAUTHENTICATED", {
    extensions: { code: "UNAUTHENTICATED" }
  });
  else return true;
});

export default shield({
  Query: {
    task: isAuthenticated,
    tasks: isAuthenticated,
    user: isAuthenticated,
    users: isAuthenticated,
  },
  Mutation: {
    addTask: isAuthenticated,
    deleteTask: isAuthenticated,
    updateTask: isAuthenticated,
    updateUser: isAuthenticated,
  },
});
