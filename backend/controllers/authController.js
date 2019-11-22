const express = require('express');
const cors = require('cors');
require('dotenv').config();
//const bcrypt = require('bcrypt');
const client = require('../db/config');
const joi = require('joi');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());



exports.createUser = (req, res, next) => {
  console.log('post body', req.body)

  const schema = joi.object().keys({
    firstName: joi.string().trim().required(),
    lastName: joi.string().trim().required(),
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(6).required(),
    gender: joi.string().trim().required(),
    jobRole: joi.string().trim().required(),
    department: joi.string().trim().required(),
    address: joi.string().trim().required(),
    isAdmin: joi.string().trim().required()
  });
  joi.validate(req.body, schema, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result)
  })
  
  const { firstName, lastName, email, password, gender, jobRole, department, address, isAdmin } = req.body
  
  const sql = 'INSERT INTO users (firstName, lastName, email, password, gender, jobRole, department, address, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
  
  const params = [firstName, lastName, email, password, gender, jobRole, department, address, isAdmin];
  
  return client.query(sql, params)
  .then(() => {
    res.status(201).json({
      message: 'User account successfully created',
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
}

