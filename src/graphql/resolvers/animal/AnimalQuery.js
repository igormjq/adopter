export default {
  async animals(parent, { first, skip, where }, { prisma }, info) {
    const whereFilter = {
      ...where,
      address: {
        city_contains: where.address.city,
        uf: where.address.uf
      }
    };
    
    return await prisma.query.animals({ first, skip, where: whereFilter }, info);
  },
  async animal(parent, { id }, { prisma }, info) {
    return await prisma.query.animal({ where: { id } }, info);
  },
}