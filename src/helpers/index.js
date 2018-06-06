import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ObjectID } from 'mongodb'

export const hashPassword = pass => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hash(pass, salt);
}

export const isValidId = id => {
  return ObjectID.isValid(id);
}

export const sendError = e => {
  let error = { status: null, message: '' };

    if(e.name === 'ValidationError') {
      error.status = 400;
      error.message = 'Dados inválidos'
      error.invalid_data = Object.keys(e.errors).map(err => err);
    }

    return error;
}