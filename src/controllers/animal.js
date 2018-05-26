import { responseGenerator } from '../helpers';

class Animal {
  constructor(model) {
    this.animal = model;
  }

  fetch(req, res) {
    this.animal.find({})
      .then(animals => res.status(200).send(responseGenerator(200, animals)))
      .catch(err => res.status(400).send(err.message))
  }

  create(req, res) {
    const animal = req.body;

    this.animal.create(animal)
      .then(data => res.status(201).send(responseGenerator(201, data, 'Animal inserido com sucesso')))
      .catch(err => res.status(400).send(err.message));
  }
}

export default Animal;