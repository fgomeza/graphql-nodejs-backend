export default `#graphql
type Query {
  tasks: [Task!]!
  task(id: ID!): Task
  users: [User!]!
  user(id: ID!): User
}

type Mutation {
  addTask(task: AddTaskInput): Task
  createUser(user: CreateUserInput): User
  deleteTask(id: ID!): Task
  updateTask(id: ID!, edits: UpdateTaskInput): Task
}

type Task {
  id: ID!
  title: String!
}

type User {
  id: ID!
  email: String!
  password: String!
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
`
