import _ from 'lodash'
import UserModel from '../models/user/user'
import InstitutionModel from '../models/user/institution'
import PersonModel from '../models/user/person'
import { isValidId } from '../helpers/'

class User {
  constructor() {
    this.User = UserModel,
    this.Institution = InstitutionModel,
    this.Person = PersonModel
  }

  create (req, res) {
    let user = this._defineUser(req.body);

    if(!user)
      return res.status(400);

    user
      .save()
        .then(() => user.generateToken())
        .then(token => res.header('x-auth', token).status(201).send({ message: 'Usuário criado', user }))
        .catch(e => {
          console.log(e)
          let { status, message, invalid_data } = User.sendError(e); 
          res.status(status).send({ status, message, invalid_data })
        });
  }

  update (req, res) {
    let update = _.pick(req.body, ['name', 'email', 'phone', 'address', 'about', 'website']);
    const options = { new: true };
    const _id = req.params.id;
    update.updatedAt = new Date();

    if(!isValidId(_id)) {
      return res.status(400).send({ message: 'ID Inválido' });
    } else if (!(req.user._id.toString() === _id)) {
      return res.status(401).send({ message: 'Forbidden' });
    }

    req.user.role === 'person' ? this.Person : this.Institution
      .findByIdAndUpdate(_id, { $set: update }, options)
        .then(user => {
          res.send({ message: 'Updated', data: user });
        })
        .catch(err => res.status(400).send('Não foi possivel realizar a tarefa'));

  }

  async login(req, res) {
    let { email, password } = req.body;
    let user, token;

    try {
      user = await this.User.findByEmailAndPassword(email, password);
      token = await user.generateToken();
      res.header('x-auth', token).send(user);
    } catch (e) {
      res.status(404).send({ message: 'Email inexistente/Senha inválida' });
    }
  }
  
  findByToken(req, res) {
    res.send(req.user);
  }

  _defineUser(user) {
    let props = ['email', 'password', 'name', 'phone', 'role', 'createdAt'];
    user.createdAt = new Date();
    
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
    } else {
      error.status = 400;
      error.message = 'Bad request'
    }

    return error;
  }
}

export default User;