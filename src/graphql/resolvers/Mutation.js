import UserMutations from './user/UserMutations';
import RoleMutations from './role/RoleMutation';
import AnimalMutations from './animal/AnimalMutations';
import AdoptionRequestMutations from './adoption/AdoptionRequestMutation';

const Mutation = {
  ...UserMutations,
  ...RoleMutations,
  ...AnimalMutations,
  ...AdoptionRequestMutations,
};

export { Mutation as default };