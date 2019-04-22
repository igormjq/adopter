import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  async createUser (parent, { data }, { prisma }, info) {
    const password = await bcrypt.hash(data.password, 10);
    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password
      }
    });
    
    delete user.password;

    return {
      token: jwt.sign({ id: user.id }, 'secret'),
      user
    };
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