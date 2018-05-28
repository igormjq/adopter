import _ from 'lodash'
import { responseGenerator, handleError } from '../helpers'
import UserModel from '../models/user'

class User {
  constructor() {
    this.User = UserModel
  }

  create (req, res) {
    const user = new this.User(_.pick(req.body, ['email', 'password']));

    user
      .save()
        .then(() => user.generateToken())
        .then(token => {
          res.header('x-auth', token).status(201).send(responseGenerator(201, user, 'Usuário criado'))
        })
        .catch(err => res.status(409).send(handleError(err, 409)));
  }

}

export default User;