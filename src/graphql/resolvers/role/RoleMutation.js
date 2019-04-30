export default {
  async createRole(parent, { data }, { prisma }, info) {
    const role = await prisma.mutation.createRole({ data }, info);
    
    return role;
  }
}