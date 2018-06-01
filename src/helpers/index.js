import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ObjectID } from 'mongodb'

export const responseGenerator = (status, data, message) => {
  switch(status) {
    case 200:
      return {
        status,
        data
      }
    case 201: {
      return {
        status,
        message,
        data
      }
    }
    default: {
      return {
        status, message
      }
    }
  }
}

export const hashPassword = pass => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hash(pass, salt);
}

export const isValidId = id => {
  return ObjectID.isValid(id);
}