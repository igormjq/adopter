import { GraphQLServer } from 'graphql-yoga';
import bodyParser from 'body-parser';
import resolvers from './graphql/resolvers';
import prisma from './prisma';
import HasRoleDirective from './graphql/directives/HasRoleDirective';
import AuthDirective from './graphql/directives/AuthDirective';

const server = new GraphQLServer({
  typeDefs: './src/graphql/schema.graphql',
  resolvers,
  context({ request }) {
    return {
      prisma,
      request
    }
  },
  schemaDirectives: {
    hasRole: HasRoleDirective,
    auth: AuthDirective
  }
});

server.express.use(bodyParser.json());
server.express.use(bodyParser.urlencoded({ extended: false }));

export default server;