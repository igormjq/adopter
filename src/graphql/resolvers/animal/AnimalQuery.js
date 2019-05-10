export default {
  async animals(parent, { first, skip }, { prisma }, info) {
    return await prisma.query.animals({ first, skip }, info);
  },
  async animal(parent, { id }, { prisma }, info) {
    return await prisma.query.animal({ where: { id }}, info);
  }
}