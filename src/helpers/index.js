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
  }
}

export const hashPassword = pass => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hash(pass, salt);
}