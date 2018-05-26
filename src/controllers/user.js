import _ from 'lodash'
import { responseGenerator } from '../helpers'
import UserModel from '../models/user'

class User {
  constructor() {
    this.user = UserModel
  }

  create (req, res) {
    const emailAndPassword = _.pick(req.body, ['email', 'password']);
    const user = new this.user(emailAndPassword);

    user
      .save()
        .then(epa => {
          console.log(epa);
          res.status(201).send(responseGenerator(201, 'Usuário adicionado'));
        })
        .catch(err => console.log(err));
  }
}

export default User;