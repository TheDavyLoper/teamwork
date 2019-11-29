const express = require('express');
const gifController = require('../controllers/gifController'); 
const verifyToken = require('../middleware/auth.middleware')


const app =  express();

app.use(express.json())
app.use(express.urlencoded({extended: false}));

const router = express.Router();


router.post('/', verifyToken, gifController.postGif);
router.get('/:id', verifyToken, gifController.getGifById);
router.get('/', verifyToken, gifController.getAllGifs);
router.delete('/:id', verifyToken, gifController.deleteGif);




module.exports = router