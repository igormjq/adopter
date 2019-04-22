import { GraphQLServer } from 'graphql-yoga';
import resolvers from './graphql/resolvers';
import prisma from './prisma';

const server = new GraphQLServer({
  typeDefs: './src/graphql/schema.graphql',
  resolvers,
  context({ req }) {
    return {
      prisma
    }
  }
})

export default server;