import Query from './Query';
import Mutation from './Mutation';

export default {
  Query,
  Mutation,
  AuthPayload: {
    user: async ({ user: { id }}, args, { prisma }, info) => prisma.query.user({ where: { id }}, info) 
  },
  Animal: {
    photos: async (parent, args, { prisma }, info) => JSON.parse(parent.photos)
  },
  User: {
    receivedAdoptionRequests: async (parent, args, { prisma }, info) => {
      const query = await prisma.query.adoptionRequests({
        where: {
          animal: {
            owner: {
              id: parent.id
            }
          }
        }
      }, info);

      return query;
    }
  }
}