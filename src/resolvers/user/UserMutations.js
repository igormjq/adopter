import bcrypt from 'bcryptjs';

export default {
  async createUser (parent, { data }, { prisma }, info) {
    const password = await bcrypt.hash(data.password, 10);
    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password
      }
    });

    return user;
  }
}