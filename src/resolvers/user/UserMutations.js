export default {
  async createUser (parent, { data }, { prisma }, info) {
    const user = await prisma.mutation.createUser({ data });

    console.log(user);

    return user;
  }
}