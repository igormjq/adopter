const Mutation = {
  createUser(parent, { data }, { prisma }, info) {
    console.log('has prisma?', prisma);
    return 'Oi'
  }
};

export { Mutation as default };