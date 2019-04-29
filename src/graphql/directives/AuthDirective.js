import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import getUser from '../../utils/getUser';

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

    field.resolve = async function (parent, args, { prisma, request }, info) {
      const authenticatedUser = getUser(request.headers['authorization']);

      if (authenticatedUser) {
        const user = await prisma.query.user({ where: { id: authenticatedUser } } );
      
        if (user) {
          request.user = user;
          return resolve.apply(this, arguments)
        };

        throw new Error('Usuário não encontrado');
      }
      throw new Error('Não autorizado');
    };
  }
}
