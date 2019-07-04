export default {
  async animals(parent, { first, skip, where }, { prisma }, info) {
    return await prisma.query.animals({ first, skip, where: where ? where : {} }, info);
  },
  async animal(parent, { id }, { prisma }, info) {
    return await prisma.query.animal({ where: { id } }, info);
  },
}