export default {
  async animals(parent, { first, skip, where }, { prisma }, info) {
    console.log(where);
    return await prisma.query.animals({ first, skip, where }, info);
  },
  async animal(parent, { id }, { prisma }, info) {
    return await prisma.query.animal({ where: { id } }, info);
  },
}