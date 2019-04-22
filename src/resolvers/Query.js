const Query = {
  async users(parent, args, { prisma }, info) {
    return await prisma.query.users(info);
  }
};

export { Query as default };