const express = require('express');
const cors = require('cors');
require('dotenv').config();
const client = require('../db/config');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

exports.createArticle = (req, res, next) => {
  console.log(req.body)

  const date = new Date()
  const { title, article } = req.body
  const sql = 'INSERT INTO articles (title, article, date) VALUES($1, $2, $3)'
  const params = [title, article, date];

  return client.query(sql, params)
    .then(result => {
      const successData = {
        status: 'success',
        data: {
          message: 'Article successfully posted',
          articleId: `SELECT articleId FROM articles where title = $1 VALUES [title]`,
          title: result.rows[0].title,
          createdOn: date
        }
      };
      res.status(200).json(successData);
    })
    .catch(() => {
    
        return res.status(400).json({ message: 'cannot post article at this time' });
    
    })
}


exports.articleComment = (req, res, next) => {

  const date = new Date()
  const { commentId, comment } = req.body;

  const sql = 'INSERT INTO articlecomment (commentId, comment, date) VALUES($1, $2, $3) RETURNING *'
  const params = [commentId, comment, date]
  return client.query(sql, params)
    .catch(err => {
      if (err) {
        return res.status(400).json({
          status: 'error',
          message: 'error posting comment'
        });
      }
    })
    .then((result) => {
      client.query(
        `SELECT commentId, comment, date FROM articlecomment JOIN articles ON articles.articleid = articlecomment.articleId WHERE commentId = ${result.rows[0].commentId} `,
        (error, results) => {
          if (error) {
            return res.status(400).json({
              status: 'error',
              message: 'error retrieving comment from database'
            });
          }
          res.json({
            status: 'success',
            data: {
              message: 'comment successfully created',
              articleTitle: results.rows[0].title,
              article: results.rows[0].article,
              comment: results.rows[0].comment,
              date: new Date()
            }
          });
        }
      );
    })
}

exports.updateArticleById = (req, res, next) => {

  const { title, article } = req.body
  const date = new Date();
  const sql = `UPDATE articles SET title = $1, article = $2, date =$3 WHERE articleId = $4 RETURNING *`
  const params = [title, article, date, parseInt(req.params.id)]

  return client.query(sql, params)
    .catch(error => {
      if (error) {
        res.status(404).json({
          error
        })
      }
    })
    .then(result => {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Article successfully updated',
          title: result.rows[0].title,
          article: result.rows[0].article,
          articleId: result.rows[0].id,
          date : new date()
        }
      })
    })

}

exports.getArticleById = (req, res, next) => {
  const sql = 'SELECT * FROM articles WHERE articleId = $1;'
  const params = [parseInt(req.params.id)];
  return client.query(sql, params)
    .then(result => {
      res.status(200).json({
        status: 'success',
        data: results.rows[0],
        comments: result.rows
      })
    })
    .catch(error => {
      res.status(403).json({
        error
      })
    })
}



exports.getArticles = (req, res, next) => {

  return client.query('SELECT * FROM articles;')
    .then((articles) => {
      res.status(200).json({
        message: 'Articles requested successfully',
        log: articles.rows[0].articles
      })
    })
    .catch(error => {
      res.status(404).json({
        message: error
      })
    })

}



exports.deleteArticleById = (req, res, next) => {

  const sql = 'DELETE FROM articles WHERE articleId = $1;'
  const params = [parseInt(req.params.id)]
  return client.query(sql, params)
    .then(() => {
      res.status(200).json({
        status: "success",
        data: {
          message: "Article successfully deleted"
        }
      })
    })
    .catch(error => {
      res.status(404).json({
        error
      })
    })
}

