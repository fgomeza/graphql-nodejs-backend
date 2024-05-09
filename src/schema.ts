export default `#graphql
type Query {
  tasks: [Task!]!
  task(id: ID!): Task
}

type Mutation {
  addTask(task: AddTaskInput): Task
  deleteTask(id: ID!): [Task]
  updateTask(id: ID!, edits: UpdateTaskInput): Task
}

type Task {
  id: ID!
  title: String!
}

input AddTaskInput {
  title: String!
}

input UpdateTaskInput {
  title: String
}
`
