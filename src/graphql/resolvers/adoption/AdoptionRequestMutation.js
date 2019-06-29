export default {
  async createAdoptionRequest(parent, { animalId }, { prisma, request }, info) {
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
  }
};