import jwt from 'jsonwebtoken';

export default header => {
  if(!header) throw new Error('Não autenticado');
  const token = header.replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded.id;
}