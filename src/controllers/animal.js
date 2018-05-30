import _ from 'lodash'
import { responseGenerator } from '../helpers'
import AnimalModel from '../models/animal'

class Animal {
  constructor() {
    this.animal = AnimalModel;
  }

  fetch(req, res) {
    this.animal.find({})
      .then(animals => res.status(200).send(responseGenerator(200, animals)))
      .catch(err => res.status(400).send(err.message))
  }

  create(req, res) {
    const { body: animal , user: creator } = req;
    console.log('creator', creator);

    this.animal.create(Animal.createAnimal(animal, creator))
      .then(data => res.status(201).send(responseGenerator(201, data, 'Animal inserido com sucesso')))
      .catch(err => res.status(400).send(err.message));
  }

  static createAnimal (data, creator) {
    
    let animal = _.pick(data, ['name', 'type', 'gender', 'size', 'castraded', 'vacinated', 'description']);
    animal.createdAt = new Date();
    animal._creator = creator;

    return animal
  }
}

export default Animal;