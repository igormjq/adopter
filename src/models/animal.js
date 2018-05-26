import mongoose from 'mongoose';

const AnimalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Animal = mongoose.model('Animal', AnimalSchema);

export default Animal;