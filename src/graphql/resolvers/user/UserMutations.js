import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  async login(parent, { data }, { prisma }, info) {
    let user, passwordMatch;
    
    user = await prisma.query.user({ where: { email: data.email }});

    if(!user) throw new Error('Usuário não encontrado');

    passwordMatch = await bcrypt.compare(data.password, user.password);

    if(!passwordMatch) throw new Error('Senha incorreta');

    const { password, ...payloadUser } = user;

    return {
      token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
      user: payloadUser
    };

  },
  async createUser (parent, { data }, { prisma }, info) {
    const password = await bcrypt.hash(data.password, 10);
    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password,
        role: {
          connect: {
            name: data.role
          }
        }
      }
    }, `{ id name email role { name } }`);

    return {
      token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
      user
    };
  },
  async updateUser(parent, { data }, { prisma, request }, info) {
    return prisma.mutation.updateUser({
      where: { id: request.user.id },
      data
    }, info);
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    return await prisma.mutation.deleteUser({ where: { id: request.user.id }}, info);
  }
}