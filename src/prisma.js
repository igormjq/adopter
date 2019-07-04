import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: './src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT
});

export default prisma;