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
    console.log(process.env.JWT_SECRET);
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
            id: data.role
          }
        }
      },
    }, `{ id name role { name displayName permissions { name displayName }} }`);

    return {
      token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
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