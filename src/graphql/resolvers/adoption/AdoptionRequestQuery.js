export default {
  async adoptionRequests(parent, args, { prisma }, info) {
    return await prisma.query.adoptionRequests(null, info);
  }
}