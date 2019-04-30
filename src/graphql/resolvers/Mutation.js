import UserMutations from './user/UserMutations';
import RoleMutations from './role/RoleMutation';

const Mutation = {
  ...UserMutations,
  ...RoleMutations
};

export { Mutation as default };