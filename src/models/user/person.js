import mongoose from 'mongoose'
import validator from 'validator'
import User from './user'

const PersonUserSchema = new mongoose.Schema({
  cpf: {
    type: String,
    required: true,
    validate: {
      validator: value => validator.isLength(value, { min: 11, max: 11 }),
      message: 'CPF inválido'
    }
  },
  address: {
    type: String,
    required: true
  },
  hasAdopted: {
    type: Boolean,
    default: false
  },
  animalInterest: []
});

const PersonUser = User.discriminator('Person', PersonUserSchema);

export default PersonUser;