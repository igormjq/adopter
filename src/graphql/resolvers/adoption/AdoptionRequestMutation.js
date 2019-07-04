export default {
  async createAdoptionRequest(parent, { animalId }, { prisma, request }, info) {
    const adoptionRequestExists = await prisma.exists.AdoptionRequest({
      animal: {
        id: animalId
      },
      sentBy: {
        id: request.user.id
      }
    });
    
    if(adoptionRequestExists) throw new Error('Solicitação de adoção já realizada.');

    return await prisma.mutation.createAdoptionRequest({
      data: {
        animal: {
          connect: {
            id: animalId
          }
        },
        sentBy: {
          connect: {
            id: request.user.id
          }
        }
      }
    }, info);
  },
  async acceptAdoptionRequest(parent, { id }, { prisma, request }, info) {
    const checkUser = await prisma.exists.AdoptionRequest({
      id,
      animal: {
        owner: {
          id: request.user.id
        }
      }
    });

    if(!checkUser) throw new Error('Pedido não pertence ao usuário');

    return await prisma.mutation.updateAdoptionRequest({
      where: { id },
      data: {
        accepted: true,
      }
    }, info);
  },
};