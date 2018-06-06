import _ from 'lodash'
import { responseGenerator, isValidId } from '../helpers'
import AnimalModel from '../models/animal'

class Animal {
  constructor() {
    this.Animal = AnimalModel;
  }

  fetch(req, res) {
    this.Animal.find({})
      .then(animals => res.status(200).send(animals))
      .catch(err => res.status(400).send(err.message))
  }

  create(req, res) {
    const { body: animal , user: creator } = req;

    this.Animal.create(Animal.createAnimal(animal, creator))
      .then(data => res.status(201).send({ message: 'Dado inserido com sucesso', data }))
      .catch(err => res.status(400).send(err.message));
  }

  delete(req, res) {
    const _id = req.params.id;
    const _creator = req.user._id;
    const query = { _id, _creator };

    if(!isValidId(_id)) {
      return res.status(400).send({ message: 'ID inválido' });
    }

    this.Animal.findOneAndRemove(query)
      .then(deleted => {
        if(!deleted) {
          return res.status(404).send({ message: 'Não encontrado' });
        }
        res.status(204).send({ message: `${deleted._id} removido com sucesso` });
      })
      .catch(err => console.log(err))
  }

  updateById(req, res) {
    const options = { new: true };
    const _id = req.params.id;
    const _creator = req.user._id;

    const query = { _id, _creator };
    const update = req.body;
    update.updatedAt = new Date();

    if(!isValidId(_id)) {
      return res.status(400).send({ message: 'ID inválido' });
    }

    this.Animal
      .findOneAndUpdate(query, { $set: update }, options)
        .then(animal => {
          
          if(!animal) {
            return res.send({ message: 'Proibido' })
          }

          res.send({ message: 'Dado atualizado', data: animal })
        })
        .catch(err => console.log(err));
  }
  
  static createAnimal (data, creator) {
    
    let animal = _.pick(data, ['name', 'type', 'gender', 'size', 'castrated', 'vacinated', 'description']);
    animal.createdAt = new Date();
    animal._creator = creator;

    return animal
  }
}

export default Animal;