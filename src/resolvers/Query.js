import UserQuery from './user/UserQuery';
import AnimalQuery from './animal/AnimalQuery';

const Query = {
  ...UserQuery,
  ...AnimalQuery,
};

export { Query as default };