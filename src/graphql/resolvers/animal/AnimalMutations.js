export default {
  async createAnimal(parent, { data }, { prisma, request }, info) {
    return prisma.mutation.createAnimal({
      data: {
        ...data,
        owner: {
          connect: {
            id: request.user.id
          }
        }
      }
    }, info);
  }
}