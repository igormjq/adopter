import UserMutations from './user/UserMutations';
import RoleMutations from './role/RoleMutation';
import AnimalMutations from './animal/AnimalMutations';

const Mutation = {
  ...UserMutations,
  ...RoleMutations,
  ...AnimalMutations
};

export { Mutation as default };