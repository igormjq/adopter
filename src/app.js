import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';
import prisma from './prisma';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context({ req }) {
    return {
      prisma
    }
  }
})

export default server;