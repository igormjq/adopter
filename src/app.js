import { GraphQLServer } from 'graphql-yoga';
import bodyParser from 'body-parser';
import resolvers from './graphql/resolvers';
import prisma from './prisma';

const server = new GraphQLServer({
  typeDefs: './src/graphql/schema.graphql',
  resolvers,
  context({ request }) {
    return {
      prisma,
      request
    }
  }
});

server.express.use(bodyParser.json());
server.express.use(bodyParser.urlencoded({ extended: false }));

export default server;