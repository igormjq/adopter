export default {
  async users(parent, args, { prisma }, info) {
    return await prisma.query.users(null, info);
  }
}