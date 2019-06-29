export default async (db, model) => {
  const ids = await db.query[model](null, `{id}`);
  
  return ids.map(({ id }) => id);
};