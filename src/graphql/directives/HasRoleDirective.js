import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import getUser from '../../utils/getUser';

export default class HasRoleDirective extends SchemaDirectiveVisitor {
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

    field.resolve = async function (parent, args, { prisma, request }, info) {
      let user;
      const authenticatedUser = getUser(request.headers['authorization']);

      if (authenticatedUser) {
        user = await prisma.query.user({ 
          where: { id: authenticatedUser }},
          `{ id role { name }}`
        );
        
        const userHasRole = user.role.name === role;

        if (role && userHasRole) {
          request.user = user;
          return resolve.apply(this, arguments)
        };

        throw new Error('Você não tem permissão para acessar este conteúdo.');
      }

      throw new Error('Você precisa estar autenticado para acessar este recurso.');
    };
  }
}
