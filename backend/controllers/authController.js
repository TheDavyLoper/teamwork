const express = require('express');
const cors = require('cors');
require('dotenv').config();
const client = require('../db/config');
const { registerUser } = require('../utilities/validation');
const bcrypt = require('bcrypt');

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
}

