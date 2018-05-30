import mongoose from 'mongoose';

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
    type: Boolean
  },
  vacinated: {
    type: Boolean
  },
  isAvailabe: {
    type: Boolean
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  createdAt: {
    type: Date,
  },
  _creator: {
    type: ObjectId,
  }
});

const Animal = mongoose.model('Animal', AnimalSchema);

export default Animal;