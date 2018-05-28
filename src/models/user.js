import mongoose from 'mongoose'
import _ from 'lodash'
import { hashPassword } from '../helpers'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
});

UserSchema.pre('save', function(next) {
  hashPassword(this.password)
    .then(hashed => this.password = hashed)
    .then(() => next());
});

const User = mongoose.model('User', UserSchema);

export default User;