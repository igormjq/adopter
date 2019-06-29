import prisma from '../../src/prisma';
import getRandom from './helpers/getRandomValue';
import getIds from './helpers/getModelIds';

export default async () => {
  const userIds = await getIds(prisma, 'users');
  const animalIds = await getIds(prisma, 'animals');
  
  for(let i=0; i < 10; i++) {
    const userId = getRandom(userIds);
    const animalId = getRandom(animalIds);

    const adoptionRequestData = {
      animal: {
        connect: {
          id: animalId
        }
      },
      sentBy: {
        connect: {
          id: userId
        }
      }
    };

    await prisma.mutation.createAdoptionRequest({
      data: { ...adoptionRequestData }
    });
  }
}