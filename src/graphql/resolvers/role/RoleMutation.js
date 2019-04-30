export default {
  async createRole(parent, { data }, { prisma }, info) {
    const role = await prisma.mutation.createRole({
      data: {
        ...data,
        permissions: {
          connect: data.permissions.map(permission => ({ name: permission }))
        }
      }
    }, info);

    return role;
  }
}