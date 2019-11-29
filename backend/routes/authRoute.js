const express = require('express');
const authController = require('../controllers/authController'); 

const app =  express();

app.use(express.json())
app.use(express.urlencoded({extended: false}));


const router = express.Router();


router.post('/create-user', authController.createUser);
router.post('/signin', authController.signin)


module.exports = router
