import bcrypt from 'bcryptjs';

export default {
  async createUser (parent, { data }, { prisma }, info) {
    if(!password) throw new Error('Senha é obrigatório');

    const password = await bcrypt.hash(data.password, 10);
    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password
      }
    });

    return user;
  },
  async updateUser(parent, { id, data }, { prisma }, info) {
    return prisma.mutation.updateUser({
      where: { id },
      data
    }, info);
  },
  async deleteUser(parent, { id }, { prisma }, info) {
    return prisma.mutation.deleteUser({ where: { id }}, info);
  }
}