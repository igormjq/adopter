import bcrypt from 'bcryptjs';
import prisma from '../../src/prisma';
import faker from 'faker'

const pickRandomRole = () => {
  const roles = ["PERSON", "INSTITUTION"];
  return roles[Math.floor(Math.random() * roles.length)];
}

faker.locale ='pt_BR';

export default async () => {
  const users = await prisma.query.users();
  const isFirstSeed = users.length;

  if(isFirstSeed) {
     await prisma.mutation.createUser({
      data: {
        name: "Igor Marini Jaekel Quevedo",
        email: "igormjq@gmail.com",
        password: (await bcrypt.hash('adopter', 10)),
        phone: "+5553981189503",
        profileImg: faker.image.avatar(),
        role: {
          connect: {
            name: "ADMIN"
          }
        },
        address: {
          create: {
            street: "Rua Major Cícero de Góes Monteiro",
            number: "926",
            district: "Centro",
            city: "Pelotas",
            uf: "RS"
          }
        }
      }
    });

    await prisma.mutation.createUser({
      data: {
        name: "Miguel Novack Boanova",
        email: "mgl.deadly@gmail.com",
        password: (await bcrypt.hash('adopter', 10)),
        phone: "+5553981189503",
        profileImg: faker.image.avatar(),
        role: {
          connect: {
            name: "PERSON"
          }
        },
        address: {
          create: {
            street: "Rua Professor Olavo de Carvalho",
            number: "666",
            district: "Cohab II",
            city: "Pelotas",
            uf: "RS"
          }
        }
      }
    });

    await prisma.mutation.createUser({
      data: {
        name: "ONG Prefeitura de Pelotas",
        email: "ong.prefeitura@pelotasa.gov.br",
        password: (await bcrypt.hash('adopter', 10)),
        phone: "+555398999999",
        profileImg: faker.image.avatar(),
        cnpj: "011.145.1400-600",
        role: {
          connect: {
            name: "INSTITUTION"
          }
        },
        address: {
          create: {
            street: "Praça Coronel Pedro Osório",
            number: "561",
            district: "Centro",
            city: "Pelotas",
            uf: "RS"
          }
        }
      }
    });  
  }

  for(let i=0; i < 10; i++) {
    const randomRole = pickRandomRole();

    await prisma.mutation.createUser({
      data: {
        name: randomRole === 'PERSON' ? faker.name.firstName() : `ONG ${ faker.company.companyName() }`,
        email: faker.internet.email(),
        password: (await bcrypt.hash('adopter', 10)),
        phone: faker.phone.phoneNumber(),
        cnpj: randomRole === 'INSTITUTION' ? '011.145.1400-600' : null,
        cpf: randomRole === 'PERSON' ? '030.992.140-60' : null,
        profileImg: faker.image.avatar(),
        role: {
          connect: {
            name: randomRole
          }
        },
        address: {
          create: {
            street: faker.address.streetName(),
            number: Math.round((Math.random() * 1000)).toString(),
            district: `${faker.name.firstName()} ${faker.name.lastName()}`,
            city: faker.address.city(),
            uf: faker.address.stateAbbr()
          }
        }
      }
    });
  }
}