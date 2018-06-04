const checkUser = (req, res, next) => {
  console.log(req.user);
  if(req.user.role === 'person') {
    console.log('é pessoa')
  } else {
    console.log('institution');
  }
  next()
}

export default checkUser;