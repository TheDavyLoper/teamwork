const express = require('express');
const feedController = require('../controllers/feedController'); 
const verifyToken = require('../middleware/auth.middleware')

const app = express();

app.use(express.json());
const router = express.Router();

router.get('/', verifyToken, feedController.getAllFeeds);


module.exports = router;