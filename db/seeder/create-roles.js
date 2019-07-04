import prisma from '../../src/prisma';

export default async () => {
  await prisma.mutation.createRole({
    data: {
      name: 'ADMIN',
      displayName: 'Administrador'
    }
  });
  await prisma.mutation.createRole({
    data: {
      name: 'INSTITUTION',
      displayName: 'Instituição'
    }
  });
  await prisma.mutation.createRole({
    data: {
      name: 'PERSON',
      displayName: 'Pessoa'
    }
  });
}