const express = require('express');
const cors = require('cors');
require('dotenv').config();
const client = require('../db/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

exports.getAllFeeds = (req, res, next) => {

  const sql = 'SELECT articleid, title, article, userid, articles.created_at, firstname, lastname FROM articles JOIN users ON userid = articles.userid UNION ALL SELECT gifid, title, imageurl, userid, gifs.created_at, firstname, lastname FROM gifs JOIN users ON userid = gifs.userid ORDER BY created_at DESC'

  return client.query(sql)
  .catch(err => {
    if (err) {
      console.log(err);

        res.status(400).json({
        status: 'error',
        message: 'error retrieving posts'
      });
    }
  })
  .then(result => {
    res.status(200).json({
      data: result.rows
    });
  })
}  