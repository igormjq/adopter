import prisma from '../../src/prisma';
import faker from 'faker';
import animalImages from './images/data';

const locales = ['es', 'en_US', 'de', 'it', 'fr','en_GB','pt_BR', 'es_MX', 'nl'];

const getUsersIds = async () => {
  const users = await prisma.query.users(null, `{id}`);
  
  return users.map(user => user.id);
};

const getRandom = object => {
  if(!object) return Math.random() > 0.5; // Boolean
  return object[Math.floor(Math.random() * object.length)]; // Array
}

export default async () => {
  const ids = await getUsersIds();
  
  for(let i=0; i < 21; i++) {
    faker.locale = getRandom(locales);

    const ownerId = getRandom(ids);
    const animalData = {
      type: getRandom(['DOG', 'CAT']),
      size: getRandom(['SMALL', 'MEDIUM', 'LARGE']),
      gender: getRandom(['MALE', 'FEMALE']),
      castrated: getRandom(),
      vaccinated: getRandom(),
      name: faker.name.firstName(),
      about: faker.lorem.paragraph()
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
            city: faker.address.city(),
            uf: faker.address.stateAbbr()
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