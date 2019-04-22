export default {
  async animals(parent, args, { prisma }, info) {
    return await prisma.query.animals(null, info);
  }
}