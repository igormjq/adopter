import _ from 'lodash'
import { responseGenerator } from '../helpers/'
import InstitutionModel from '../models/user/institution'
import PersonModel from '../models/user/person'

class User {
  constructor() {
    this.Institution = InstitutionModel,
    this.Person = PersonModel
  }

  create (req, res) {
    let user = this._defineUser(req.body);

    user
      .save()
        .then(() => user.generateToken())
        .then(token => {
          res.header('x-auth', token).status(201).send(responseGenerator(201, user, 'Usuário criado'))
        })
        .catch(e => {
          let { status, message, invalid_data } = User.sendError(e); 
          res.status(status).send({ status, message, invalid_data })
        });
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

  _defineUser(user) {
    let props = ['email', 'password', 'name', 'phone', 'role'];

    switch(user.role) {
      case 'institution':
        props.push('about', 'cnpj');
        return user = new this.Institution(_.pick(user, props));
      case 'person':
        props.push('cpf', 'address');
        return user = new this.Person(_.pick(user, props));
    }
  }

  static sendError(e) {
    let error = { status: null, message: '' };

    if(e.name === 'ValidationError') {
      error.status = 400;
      error.message = 'Dados inválidos'
      error.invalid_data = Object.keys(e.errors).map(err => err);
    } else if (e.code === 11000) {
      error.status = 409,
      error.message = 'Email já em uso'
    }

    return error;
  }
}

export default User;