const checkUser = (req, res, next) => {
  
  if(req.user.role === 'institution') {
    return next()
  }

  return res.status(401).send({ status: 401, message: 'Não autorizado' });

}

export default checkUser;