import User from '../models/user/user'

const auth = (req, res, next) => {
  let token = req.header('x-auth');

  User.findByToken(token)
    .then(user => {

      if(!user)
        return Promise.reject()
      
      req.user = user; // binds user to the request object to be consumed by the next middleware in the stack
      req.token = token;

      next()
    })
    .catch(err => res.status(401).send({ status: 401, message: 'Token inválido' }));


};

export default auth;