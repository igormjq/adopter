import faker from 'faker';
import prisma from '../../src/prisma';
import animalImages from './images/data';
import getAddresses from './helpers/getAddress';
import getRandom from './helpers/getRandomValue';
import getUsersIds from './helpers/getModelIds';

const locales = ['es', 'en_US', 'de', 'it', 'fr','en_GB','pt_BR', 'es_MX', 'nl'];

export default async () => {
  const ids = await getUsersIds(prisma, 'users');
  const addresses = await getAddresses();

  const animals = await prisma.query.animals();
  const isFirstSeed = animals.length === 0;

  if(isFirstSeed) {
    await prisma.mutation.createAnimal({
      data: {
        profileImg: "https://s2.glbimg.com/z38cvd1l6M_nk8lFU2GyCXhdeLE=/0x0:1280x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/3/j/7APRrpRSyBNYLBjFFciA/whatsapp-image-2019-02-22-at-14.53.01.jpeg",
        type: 'DOG',
        size: 'SMALL',
        gender: 'MALE',
        ageGroup: 'ADULT',
        castrated: getRandom(),
        vaccinated: getRandom(),
        dewormed: getRandom(),
        specialNeeds: false,
        name: "Cliff",
        about: "O cachorro caramelo à esquerda chama-se CLiff. Muito brincalhão, leal e seu prato favorito é... resto de arroz carreteiro. Não dispensa uma boa ração. Ele gosta muito das suas irmãs Anabele e Alemoa, as quais devem ser adotadas juntas. Afinal, família unida jamais será vencida!",
        address: {
          create: {
            city: getRandom(addresses),
            uf: 'RS'
          }
        },
        owner: {
          connect: {
            email: "igormjq@gmail.com"
          }
        }
      },
    });
  }
  
  for(let i=0; i < 30; i++) {
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