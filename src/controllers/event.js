import _ from 'lodash'
import EventModel from '../models/event'

class Events {
  constructor() {
    this.Event = EventModel
  }

  create(req, res) {
    const { body: event , user: creator } = req;

    this.Event.create(Events.createEvent(event, creator))
      .then(data => {
        console.log('evento criado!', data);
        res.status(201).send({ status: 201, message: 'Evento criado', data });
      })
      .catch(err => {
        let { status, message, invalid_data } = Events.sendError(err); 
        res.status(status).send({ status, message, invalid_data })
      });
  }

  static createEvent(data, creator) {
    let newEvent = _.pick(data, ['title', 'description', 'date']);
    // newEvent.date = new Date();
    newEvent.createdAt = new Date();
    newEvent._institutionId = creator;

    return newEvent;
  }

  static sendError(e) {
    let error = { status: null, message: '' };

    if(e.name === 'ValidationError') {
      error.status = 400;
      error.message = 'Dados inválidos'
      error.invalid_data = Object.keys(e.errors).map(err => err);
    }

    return error;
  }

}

export default Events