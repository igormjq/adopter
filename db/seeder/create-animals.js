import prisma from '../../src/prisma';
import faker from 'faker';

const locales = ['es', 'en_US', 'de', 'it', 'fr', 'en_IND', 'pt_BR', 'es_MX'];

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
      profileImg: faker.image.animals(),
      about: faker.lorem.paragraph()
    };
    
    await prisma.mutation.createAnimal({
      data: {
        ...animalData,
        owner: {
          connect: {
            id: ownerId
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