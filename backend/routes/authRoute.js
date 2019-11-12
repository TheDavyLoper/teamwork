const express = require('express');
const authController = require('../controllers/authRoute');

const router = express.Router();

router.post('/', authController.createUser);

module.exports = router;