import _ from 'lodash'
import { responseGenerator, isValidId } from '../helpers'
import AnimalModel from '../models/animal'

class Animal {
  constructor() {
    this.Animal = AnimalModel;
  }

  fetch(req, res) {
    this.Animal.find({})
      .then(animals => res.status(200).send(responseGenerator(200, animals)))
      .catch(err => res.status(400).send(err.message))
  }

  create(req, res) {
    const { body: animal , user: creator } = req;

    this.Animal.create(Animal.createAnimal(animal, creator))
      .then(data => res.status(201).send(responseGenerator(201, data, 'Animal inserido com sucesso')))
      .catch(err => res.status(400).send(err.message));
  }

  updateById(req, res) {
    const options = { new: true };
    const _id = req.params.id;
    const _creator = req.user._id;

    const query = { _id, _creator };
    const update = req.body;
    update.updatedAt = new Date();

    if(!isValidId(_id)) {
      return res.status(400).send({ status: 400, message: 'ID inválido' });
    }

    this.Animal
      .findOneAndUpdate(query, { $set: update }, options)
        .then(animal => {
          
          if(!animal) {
            return res.send(responseGenerator(403, null, 'Forbidden'));
          }
          res.send(responseGenerator(200, animal, `Animal ${animal._id} atualizado`))
        })
        .catch(err => console.log(err));
  }
  
  static createAnimal (data, creator) {
    
    let animal = _.pick(data, ['name', 'type', 'gender', 'size', 'castraded', 'vacinated', 'description']);
    animal.createdAt = new Date();
    animal._creator = creator;

    return animal
  }
}

export default Animal;