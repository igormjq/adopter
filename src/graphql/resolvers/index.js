import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';

export default {
  Query,
  Mutation,
  Subscription,
  AuthPayload: {
    user: async ({ user: { id }}, args, { prisma }, info) => prisma.query.user({ where: { id }}, info) 
  },
  Animal: {
    photos: async (parent, args, { prisma }, info) => JSON.parse(parent.photos)
  },
  User: {
    receivedAdoptionRequests: async (parent, args, { prisma }, info) => {
      const targetUser = parent.id;
      const query = await prisma.query.adoptionRequests({
        where: {
          animal: {
            owner: {
              id: targetUser
            }
          }
        }
      }, info);

      return query;
    }
  }
}