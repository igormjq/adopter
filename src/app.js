import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

export default server;