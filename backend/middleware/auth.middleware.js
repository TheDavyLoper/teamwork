require('dotenv').config();

const jwt = require('jsonwebtoken');

const jwtSecretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null || token === undefined) {
    return res.sendStatus(401).json(token);
  }
  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });

  // //get the auth header value
  // const bearerHeader = req.headers['authorization']
  // //check if bearerHeader is undefined
  // if (typeof bearerHeader !== 'undefined') {
  //   //split at the space
  //   const bearer = bearerHeader.split(' ')
  //   //get token from array
  //   const bearerToken = bearer[1]
  //   //set the token
  //   req.token = bearerToken;
  //  //call next middleware
  //   next();
  // }
  // else {
  //   //Forbidden
  //   res.sendStatus(403);
  // }
  // jwt.verify(req.token, jwtSecretKey, (err, user) => {
  //   if (err) return res.sendStatus(403);
  //   req.user = user;
    
  // });
};




module.exports = verifyToken

