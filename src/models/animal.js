import mongoose from 'mongoose'
import _ from 'lodash'

const { ObjectId } = mongoose.Schema.Types;

const AnimalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['dog', 'cat']
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  size: {
    type: String,
    required: true,
    enum: ['xs', 's', 'm', 'l', 'xl']
  },
  castrated: {
    type: Boolean,
    default: false
  },
  vacinated: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  imageUrl: {
    type: String,
    validate: {
      validator: value => validator.isURL(value),
      message: '{VALUE} não é uma URL válida'
    }
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: null
  },
  _creator: {
    type: ObjectId,
  }
});

AnimalSchema.methods.toJSON = function() {
  return _.pick(this, ['_id', 'name', 'type', 'gender', 'size', 'castrated', 'vacinated', 'description', 'imageUrl', 'createdAt'])
}

const Animal = mongoose.model('Animal', AnimalSchema);

export default Animal;