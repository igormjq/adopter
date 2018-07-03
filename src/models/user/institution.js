import mongoose from 'mongoose';
import User from './user'

const InstitutionSchema = new mongoose.Schema({
  cnpj: {
    type: String,
    unique: true,
    sparse: true,
  },
  about: {
    type: String,
    required: true
  },
  website: {
    type: String,
    validate: {
      validator: value => validator.isURL(value),
      message: 'URL {VALUE} inválida'
    }
  }
});

const Institution = User.discriminator('Institution', InstitutionSchema);

export default Institution;

