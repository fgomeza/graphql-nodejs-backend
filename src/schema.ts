export default `#graphql
type Query {
  task(id: ID!): Task!
  tasks: [Task!]!
  user(id: ID!): User!
  users: [User!]!
}

type Mutation {
  addTask(task: AddTaskInput): Task
  createUser(user: CreateUserInput): UserWithToken
  deleteTask(id: ID!): Task
  login(email: String!, password: String!): UserWithToken
  updateTask(id: ID!, edits: UpdateTaskInput): Task
  updateUser(id: ID!, edits: UpdateUserInput): User
}

type Task {
  id: ID!
  title: String!
}

type User {
  id: ID!
  email: String!
  name: String!
  verified: Boolean!
}

type UserWithToken {
  email: String!
  name: String!
  verified: Boolean!
  jwt: String
}

input AddTaskInput {
  title: String!
}

input CreateUserInput {
  email: String!
  password: String!
}

input UpdateTaskInput {
  title: String
}

input UpdateUserInput {
  name: String
  email: String
}
`;
