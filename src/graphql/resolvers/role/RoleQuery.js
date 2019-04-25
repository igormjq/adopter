export default {
  async roles(parent, args, { prisma }, info) {
    return await prisma.query.roles(null, info);
  }
}