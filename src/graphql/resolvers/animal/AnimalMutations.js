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
  },
  async updateAnimal(parent, { id, data }, { prisma, request }, info) {
    const isSameUser = await prisma.exists.Animal({ id, owner: { id: request.user.id }});
    
    if(!isSameUser) throw new Error('Apenas cadastrados pelo mesmo usuário podem ser editados');

    return prisma.mutation.updateAnimal({
      where: { id },
      data: { ...data }
    });
  }
}