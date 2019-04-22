export default {
  async users(parent, args, { prisma }, info) {
    return prisma.query.users(null, info);
  },
  async user(parent, { id }, { prisma }, info) {
    return prisma.query.user({ where: { id } }, info);
  }
}