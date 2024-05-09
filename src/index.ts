import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { config as dotEnvConfig } from 'dotenv'
import connectMongoDB from './config/db.js'

import resolvers from './resolvers.js'
import typeDefs from './schema.js'

dotEnvConfig()

connectMongoDB()

// server setup
const server = new ApolloServer({typeDefs, resolvers})
const port = Number(process.env.PORT) || 4000

const { url } = await startStandaloneServer(server, {
    listen: { port }
})

console.log('Server ready at port', port)