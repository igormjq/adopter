import UserQuery from './user/UserQuery';
import RoleQuery from './role/RoleQuery';
import AnimalQuery from './animal/AnimalQuery';
import AdoptionRequestQuery from './adoption/AdoptionRequestQuery';

const Query = {
  ...UserQuery,
  ...AnimalQuery,
  ...RoleQuery,
  ...AdoptionRequestQuery,
};

export { Query as default };