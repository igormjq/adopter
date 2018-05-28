import _ from 'lodash'
import { responseGenerator } from '../helpers'
import UserModel from '../models/user'

class User {
  constructor() {
    this.User = UserModel
  }

  create (req, res) {
    const emailAndPassword = _.pick(req.body, ['email', 'password']);
    const user = new this.User(emailAndPassword);

    user
      .save()
        .then(newUser => newUser.generateToken())
        .then(token => res.header('x-auth', token).status(201).send(responseGenerator(201, 'Usuário adicionado')))
        .catch(err => console.log(err));
  }
}

export default User;