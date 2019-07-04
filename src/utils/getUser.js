import jwt from 'jsonwebtoken';

export default header => {
  let decoded;

  if(!header) throw new Error('Não autorizado');

  try {
    const token = header.replace('Bearer ', '');
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch(e) {
    throw new Error('Token inválido');
  }
}