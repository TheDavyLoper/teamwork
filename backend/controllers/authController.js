const express = require('express');
const cors = require('cors');
require('dotenv').config();
const client = require('../db/config');
const { registerUser, userLogin } = require('../utilities/validation');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());


exports.createUser = (req, res, next) => {

  //validate the data for creating user
  const { error } = registerUser(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const { firstName, lastName, email, password, gender, jobRole, department, address, isAdmin } = req.body

  //function to hash the password
  bcrypt.hash(password, 10, (err, hash) => {

    const sql = 'INSERT INTO users (firstName, lastName, email, password, gender, jobRole, department, address, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    
    const params = [firstName, lastName, email, hash, gender, jobRole, department, address, isAdmin];
    
    return client.query(sql, params)
    .then(() => {
      res.status(201).json({
        message: 'User account successfully created',
        log: console.log(req.body)
      })
    })
    .catch(error => {
      res.status(404).json({
        message: error
      })
    }) 
  })
  
      
}

exports.signin = (req, res, next) => {
  //validate input data
  const { error } = userLogin(req.body);
  if (error) return res.status(404).send(error.details[0].message); 

  const { email } = req.body
  const sql = 'SELECT password FROM users WHERE email = $1'
  const params = [email];  
  client.query(sql, params, (err, result) => {
    const hash = result.rows[0].password;
    // console.log(result)
    if (result) {
      bcrypt.compare(req.body.password, hash, (error, response) => {
        if (response) {
          res.status(200).json({
            message: "Password match"
          })
        } else {
          res.status(404).json({
            error: error
          })
        }
      })
    }
  })
    
};


