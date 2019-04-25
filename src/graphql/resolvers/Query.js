import UserQuery from './user/UserQuery';
import RoleQuery from './role/RoleQuery';
import AnimalQuery from './animal/AnimalQuery';

const Query = {
  ...UserQuery,
  ...AnimalQuery,
  ...RoleQuery
};

export { Query as default };