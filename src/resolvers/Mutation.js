const Mutation = {
  createUser(parent, { data }, ctx, info) {
    console.log('i dati', data);
    return 'Oi'
  }
};

export { Mutation as default };