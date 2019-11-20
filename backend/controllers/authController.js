const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const client = require('../db/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

// const database = {
//   users : [
//     {
//       "id" : "23401",
//       "firstName" : "David",
//       "lastName" : "Akpan",
//       "email" : "david@teamwork.com",
//       "password" : "david",
//       "gender" : "male",
//       "jobRole" : "Backend developer",
//       "department" : "Backend",
//       "address" : "234 Lagos Road",
//       "isAdmin": true
//     },
//     {
      
//       "id" : "23402",
//       "firstName" : "Seth",
//       "lastName" : "Rollins",
//       "email" : "sethrollins@email.com",
//       "password" : "seth",
//       "gender" : "male",
//       "jobRole" : "Frontend developer",
//       "department" : "Frontend",
//       "address" : "123 Ave Maria",
//       "isAdmin": false
//     },
//     {
//       "firstName": "Danny",
//       "lastName": "Young", 
//       "email": "danny@teamwork.com" ,
//       "password": "danny", 
//       "gender": "male", 
//       "jobRole": "designer", 
//       "department": "ui/ux", 
//       "address": "usa",
//       "isAdmin": false
//     }
//   ]
// }

exports.createUser = (req, res, next) => {
  console.log('post body', req.body)
  // jwt.verify(req.token, 'secretkey', (err, authData) => {
  //   if (err) {
  //     res.sendStatus(403);
  //   } else {
  //     res.json({
  //       authData
  //     })
  //   }
  // })

  const { firstName, lastName, email, password, gender, jobRole, department, address, isAdmin } = req.body
  
  const sql = 'INSERT INTO users (firstName, lastName, email, password, gender, jobRole, department, address, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
  
  const params = [firstName, lastName, email, password, gender, jobRole, department, address, isAdmin];
  return client.query(sql, params)
  .then(() => {
    res.status(201).json({
      message: 'User account successfully created'
    })
  })
  .catch(error => {
    res.status(404).json({
      message: error
    })
  }) 
      
}

exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.status(200).json({
      message: 'logged in successfully'
    })
  }else {
    res.status(404).json({
      message: 'user not found'
    })
  }
  // const { email, password } = req.body;
  // const queryEmail = client.query('SELECT email from users where email = $1', [email]);
  // const queryPassword = client.query('SELECT password from users where password = $1', [password]);

  // if (req.body.email === queryEmail && req.body.password === queryPassword) {
  //   res.status(200).json({
  //     message: 'logged in successfully'
  //   })
  // } else {
  //   res.status(403).json({
  //     message: 'user not found'
  //   })
}

  // jwt.sign({user}, 'secretkey', (err, token) => {
  //   res.json({
  //     token
  //   })
  // })


//verify token
// function verifyToken (req, res, next) {
//   //get auth header value
//   const bearerHeader = req.headers['authorization'];
//   //check if bearer is undefined
//   if (typeof bearerHeader !== 'undefined') {
//     //split at the space
//     const bearer = bearerHeader.split(' ');
//     //get token from array
//     const bearerToken = bearer[1];
//     //set the token
//     req.token = bearerToken;
//     //call next middleware
//     next();
//   } else {
//     //forbidden
//     res.sendStatus(403);
//   }
// }


