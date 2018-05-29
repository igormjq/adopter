import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { hashPassword } from '../helpers'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
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

UserSchema.methods.toJSON = function() {
  return _.pick(this, ['_id', 'email']);
}

UserSchema.pre('save', function(next) {
  
  if(this.isModified('password')) {
    hashPassword(this.password)
      .then(hashed => this.password = hashed)
      .then(() => next());
  } else {
    next(); 
  }
  
});

UserSchema.methods.generateToken = function() {
  const access = 'auth';
  const token = jwt.sign({ _id: this._id, access }, process.env.JWT_SECRET);

  this.tokens.push({ access, token });

  return this.save().then(() => token)
};

// Only used by the model itself

UserSchema.statics.findByToken = function(token) {

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return Promise.reject(error);
  }

  return this.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

};

const User = mongoose.model('User', UserSchema);

export default User;