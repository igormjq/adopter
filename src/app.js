import { GraphQLServer } from 'graphql-yoga';

// 1
const typeDefs = `
type Query {
  info: String!
}
`

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

export default server;