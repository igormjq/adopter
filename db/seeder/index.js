import prisma from '../../src/prisma';
import bcrypt from 'bcryptjs';
import chalk from 'chalk';

const log = console.log;

const seedDatabase = async () => {
  log(chalk.green('Seeding database'));

  try {
    log(chalk.yellow('Creating Users...'));

    await prisma.mutation.createUser({
      data: {
        name: "Igor Marini Jaekel Quevedo",
        email: "igormjq@gmail.com",
        password: (await bcrypt.hash('adopter', 10)),
        phone: "+5553981189503",
        role: {
          create: {
            name: "ADMIN",
            displayName: "Administrador"
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
        role: {
          create: {
            name: "PERSON",
            displayName: "Pessoa"
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
        name: "ONG Amigos Dos Animais",
        email: "amigos.ong@amigos.com",
        password: (await bcrypt.hash('adopter', 10)),
        phone: "+5553981189503",
        cnpj: "011.145.1400-600",
        role: {
          create: {
            name: "INSTITUTION",
            displayName: "Instituição"
          }
        },
        address: {
          create: {
            street: "Rua José de Alencar",
            number: "55",
            complement: "A",
            district: "Azenha",
            city: "Porto Alegre",
            uf: "RS"
          }
        }
      }
    });
    console.log("OK");
  } catch(err) {
    throw new Error(err);
  }
  
};

seedDatabase();