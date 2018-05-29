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
        .catch(err => res.status(409).send({ status: 409, message: 'Email já em uso' }));
  }

  async login(req, res) {
    let { email, password } = req.body;
    let user, token;

    try {
      user = await this.User.findByEmailAndPassword(email, password);
      token = await user.generateToken();
      res.header('x-auth', token).send(user);
    } catch (e) {
      res.status(404).send({ status: 404, message: 'Email inexistente/Senha inválida' });
    }
  }
}

export default User;