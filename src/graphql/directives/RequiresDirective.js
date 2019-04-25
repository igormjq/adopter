import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import getUser from '../../utils/getUser';

export default class RequiresDirective extends SchemaDirectiveVisitor {
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
    const { permission } = this.args;

    field.resolve = async function (parent, args, { prisma, request }, info) {
      const authenticatedUser = getUser(request.headers['authorization']);

      if (authenticatedUser) {
        const user = await prisma.query.user({ 
          where: { id: authenticatedUser }},
          `{ id role { name permissions { name } }}`
        );
        
        const userHasPermission = user.role.permissions.find(userPermission => userPermission.name === permission);

        if (permission && userHasPermission) {
          request.user = user;
          return resolve.apply(this, arguments)
        };

        throw new Error('Você não tem permissão para acessar este conteúdo.');
      }

      throw new Error('Você precisa estar autenticado para acessar este recurso.');
    };
  }
}
