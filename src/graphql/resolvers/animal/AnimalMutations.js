import operationMap from '../../../utils/operationMap';

const isSameUser = async (prisma, animalId, userId) => {
  return await prisma.exists.Animal({ id: animalId, owner: { id: userId }});
}

export default {
  async createAnimal(parent, { data }, { prisma, request }, info) {
    return prisma.mutation.createAnimal({
      data: {
        ...data,
        photos: JSON.stringify(data.photos),
        owner: {
          connect: {
            id: request.user.id
          }
        }
      }
    }, info);
  },
  async updateAnimal(parent, { id, data }, { prisma, request }, info) {
    const allowed = await isSameUser(prisma, id, request.user.id);

    if(!allowed) throw new Error('Apenas animais cadastrados pelo mesmo usuário podem ser editados');

    return prisma.mutation.updateAnimal({
      where: { id },
      data: { ...data }
    });
  },
  async deleteAnimal(parent, { id }, { prisma, request }, info) {
    const allowed = await isSameUser(prisma, id, request.user.id);

    if(!allowed) throw new Error('Apenas cadastrados pelo mesmo usuário podem ser excluidos');

    return prisma.mutation.deleteAnimal({ where: { id }});
  },
  async toggleFavoriteAnimal(parent, { animalId }, { prisma, request }) {
    const operation = await prisma.exists.Animal({
      id: animalId,
      likedBy_some: {
        id: request.user.id
      }
    }) ? 'disconnect' : 'connect';

    const userLikedAnimal = await prisma.mutation.updateAnimal({
      where: { id: animalId },
      data: {
        likedBy: {
          [operation]: {
            id: request.user.id
          }
        }
      }
    });
    
    return {
      success: !!userLikedAnimal,
      operation: operationMap.get('animals').toggleFavoriteAnimal[operation],
      message: `${ operation === 'connect' ? 'adicionado aos favoritos' : 'removido dos seus favoritos' }`
    }
  }
}