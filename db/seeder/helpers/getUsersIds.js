export default async db => {
  const users = await db.query.users(null, `{id}`);
  
  return users.map(user => user.id);
};