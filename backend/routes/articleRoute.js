const express = require('express');
const articleController = require('../controllers/articleController');

const app = express();

app.use(express.json());
const router = express.Router();

router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticleById);
router.get('/:id', articleController.getArticleById);
router.get('/', articleController.getArticles);
router.delete('/:id', articleController.deleteArticleById);

module.exports = router

