import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
    case 409: {
      return {
        status,
        message
      }
    }
  }
}

export const handleError = (e, status) => {
  switch(e.code) {
    case 11000:
      return responseGenerator(status, null, 'Email indisponível');
  }
}

export const hashPassword = pass => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hash(pass, salt);
}