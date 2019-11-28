const express = require('express');
const cors = require('cors');
require('dotenv').config();
const client = require('../db/config');
const { registerUser, userLogin } = require('../utilities/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth.middleware')



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const jwtSecretKey = process.env.SECRET_KEY;

//Employee sign-in route
exports.signin = (req, res) => {

  //validate input data
  const { error } = userLogin(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  return client.query(`SELECT * FROM users WHERE email = '${req.body.email}'`)
    .catch(err => {
      if (err || result.rows === '' || result.rowCount === 0) {
        return res.status(404).json({ status: 'error', message: 'user not found' });
      }
    })
    .then(result => {
      //save password from the database in a variable
      const savedPassword = result.rows[0].password;

      //compare passwords
      bcrypt.compare(req.body.password, savedPassword).then(pass => {
        if (!pass) {
          return res.status(403).json({ status: 'failed', message: 'invalid credentials' });
        }

        //create a user object
        const user = {
          userId: result.rows[0].userId,
          jobRole: result.rows[0].jobrole
        };

        //create token
        jwt.sign(user, jwtSecretKey, (err, token) => {
          const validUser = {
            status: 'success',
            data: {
              token,
              userId: result.rows[0].id,
              // firstname: result.rows[0].firstname,
              // lastname: result.rows[0].lastname,
              email: result.rows[0].email
              // gender: result.rows[0].gender,
              // jobrole: result.rows[0].jobrole,
              // department: result.rows[0].department,
              // address: result.rows[0].address
            }
          };
          res.status(200).json(validUser);
          res.end();
        })


      })
    })
}


//Employee registration route
exports.createUser = (req, res, next) => {

  //validate input data
  const { error } = registerUser(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  //destructure
  const { firstname, lastname, email, password, gender, jobrole, department, address } = req.body

  //Hash password
  bcrypt.hash(password, 10, (hash) => {

    const sql = 'INSERT INTO users(firstname, lastname, email, password, gender, jobrole, department, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8)'

    const params = [firstname, lastname, email, hash, gender, jobrole, department, address]

    client.query(sql, params, (err, result) => {
      if (err) {
        res.sendStatus(403);
      }
      const newUser = {
        status: 'success',
        data: {
          message: 'User account successfully created',
          token: req.token,
          userId: result.rows[0].id,
          email: result.rows[0].email
        }
      };
      res.json({
        newUser
      })
    })
    // .then((result) => {
    //   if (result) {

    //     const newUser = {
    //       status: 'success',
    //       data: {
    //         message: 'User account successfully created',
    //         token: req.token,
    //         userId: result.rows[0].id,
    //         email: result.rows[0].email
    //       }

    //     };
    //     res.json({
    //       newUser
    //     })
    //   }

    // })
    // .catch(() => {
    //   res.status(403).json(err);
    // })


  });
  // console.log(hashedPassword);

  // const { firstname } = req.body;
  // const { lastname } = req.body;
  // const { email } = req.body;
  // const password = hashedPassword;
  // const { gender } = req.body;
  // const { jobrole } = req.body;
  // const { department } = req.body;
  // const { address } = req.body;  
}



