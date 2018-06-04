import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import _ from 'lodash'
import bcrypt from 'bcryptjs'
import { hashPassword } from '../../helpers'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: value => validator.isEmail(value),
      message: '{VALUE} não é um email válido'
    }
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true,
    // validate: {
    //   validator: value => validator.isMobilePhone(value, 'pt-BR'),
    //   message: 'Telefone inválido'
    // }
  },
  role: {
    type: String,
    required: true,
    enum: ['institution', 'person', 'default']
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date,
    default: null
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
  return _.pick(this, ['_id', 'email', 'name', 'phone', 'address', 'cpf', 'cnpj', 'about', 'website', 'createdAt']);
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

UserSchema.statics.findByEmailAndPassword = function(email, password) {

  return this.findOne({ email })
    .then(user => {
      if(!user) {
        return Promise.reject();
      }

      return bcrypt.compare(password, user.password)
        .then(isValid => !!isValid ? user : Promise.reject());
    })

}

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