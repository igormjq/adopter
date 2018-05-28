import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { hashPassword, tokenGenerator } from '../helpers'

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
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.pre('save', function(next) {
  hashPassword(this.password)
    .then(hashed => this.password = hashed)
    .then(next());
});

UserSchema.methods.generateToken = function() {
  const access = 'auth';
  const token = jwt.sign({ _id: this._id }, access);
  
  this.tokens.push({ access, token });

  return this.save().then(() => token);
};

const User = mongoose.model('User', UserSchema);

export default User;