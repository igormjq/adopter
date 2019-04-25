import Query from './Query';
import Mutation from './Mutation';

export default {
  Query,
  Mutation,
  User: {
    role(parent) {
      return parent.role;
    }
  }
}