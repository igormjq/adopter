import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';

export default class AuthDirective extends SchemaDirectiveVisitor {
  /**
   * @override
   */
  visitObject(type) {
    this.ensureFieldsWrapped(type);
  }

  /**
   * Directive resolver
   * For each user's role
   * verify if directive role is on users role array
   * @override
   * @param {*} field
   */
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { role } = this.args;
    field.resolve = async function (parent, args, { user }) {
      if (user) {
        const haveRole = user.roles.find(userRole => userRole.name === role);

        if (role && haveRole) return resolve.apply(this, arguments);

        throw new Error('Você não tem permissão para acessar este conteúdo.');
      }

      throw new Error('Você precisa estar autenticado para acessar este recurso.');
    };
  }
}
