export default {
  async animals(parent, { first, skip }, { prisma }, info) {
    return await prisma.query.animals({ first, skip }, info);
  }
}