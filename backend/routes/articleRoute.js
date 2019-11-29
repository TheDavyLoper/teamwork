const express = require('express');
const articleController = require('../controllers/articleController');
const verifyToken  = require('../middleware/auth.middleware');
// const app = express();

// app.use(express.json());
const router = express.Router();

router.post('/', verifyToken, articleController.createArticle);
// router.post('/:id/comment', verifyToken, articleController.articleComment); 
// router.patch('/:id', verifyToken, articleController.updateArticleById);
// router.get('/:id', verifyToken, articleController.getArticleById);
// router.get('/', verifyToken, articleController.getArticles);
// router.delete('/:id', verifyToken, articleController.deleteArticleById);

module.exports = router

