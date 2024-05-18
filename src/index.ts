import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { config as dotEnvConfig } from "dotenv";
import { applyMiddleware } from "graphql-middleware";

import connectMongoDB from "./config/db.js";
import resolvers from "./resolvers.js";
import typeDefs from "./schema.js";
import context from './context.js'
import shieldMiddleware from "./authMiddleware.js"

dotEnvConfig();
connectMongoDB();

// server setup
const server = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers }),
    shieldMiddleware
  )
});
const port = Number(process.env.PORT) || 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port },
  context
});

console.log("Server ready at port", port);
