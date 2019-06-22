import faker from 'faker';
import prisma from '../../src/prisma';
import animalImages from './images/data';
import getAddresses from './helpers/getAddress';
import getRandom from './helpers/getRandomValue';
import getUsersIds from './helpers/getUsersIds';

const locales = ['es', 'en_US', 'de', 'it', 'fr','en_GB','pt_BR', 'es_MX', 'nl'];

export default async () => {
  const ids = await getUsersIds(prisma);
  const addresses = await getAddresses();
  
  for(let i=0; i < 21; i++) {
    faker.locale = getRandom(locales);

    const ownerId = getRandom(ids);
    const animalData = {
      type: getRandom(['DOG', 'CAT']),
      size: getRandom(['SMALL', 'MEDIUM', 'LARGE']),
      gender: getRandom(['MALE', 'FEMALE']),
      ageGroup: getRandom(['ADULT', 'ELDERLY', 'PUPPY']),
      castrated: getRandom(),
      vaccinated: getRandom(),
      dewormed: getRandom(),
      specialNeeds: getRandom(),
      name: faker.name.firstName(),
      about: faker.lorem.paragraphs()
    };
    const profileImg = getRandom(animalImages[animalData.type]);
    
    faker.locale = 'pt_BR';

    await prisma.mutation.createAnimal({
      data: {
        ...animalData,
        profileImg,
        owner: {
          connect: {
            id: ownerId
          }
        },
        address: {
          create: {
            city: getRandom(addresses),
            uf: 'RS'
          }
        },
        likedBy: {
          connect: {
            id: getRandom(ids)
          }
        }
      }
    });
  }
}