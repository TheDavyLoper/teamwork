const client = require('../db/queries');

exports.createUser = (req, res) => {
  const { firstName, lastName, email, password, gender, jobRole, department, address, isAdmin } = req.body;

  client.query('INSERT INTO users (firstName, lastName, email, password, gender, jobRole, department, address, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',[firstName, lastName, email, password, gender, jobRole, department, address, isAdmin], (error) => {
    if(error) {
      res.status(400).json({
        error: error
      })
    }
    res.status(201).json({
      status: "User account successfully created"
    })
  })
}