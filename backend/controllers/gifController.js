const express = require('express');
const cors = require('cors');
require('dotenv').config();
const client = require('../db/config');
const cloudinary = require('cloudinary').v2;
// const cloudinaryConfig = require('../utilities/cloudinaryConfig');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());


exports.postGif = (req, res, next) => {
 
  const { title, imageUrl } = req.body
  const date = new Date()

  const sql = 'INSERT INTO gifs(title, imageUrl, date) VALUES($1, $2, $3) RETURNING *'
  const params = [title, imageUrl, date]
  
    const image = req.files.image;
    cloudinary.uploader.upload(image.tempFilePath, (response) => {
      if (response.url !== undefined) {
       return client.query(sql, params)
        .then(result => {
          res.status(200).json(result.rows);
        }) 
        .catch((err) => {
          if (err) {
            return res.status(400).json({
              status: 'error',
              message: 'error uploading gif to database'
            });
          } 
        })    
     
    }else {
      res.status(400).json({
        status: 'error',
        message: 'error uploading gif'
      });
    }
  });
  
}


exports.gifComment = (req, res) => {
  const { comment } = req.body;
  const date = new Date();
  const sql = 'INSERT INTO gifcomment(comment, date) VALUES($1, $2) RETURNING *'
  const params = [comment, date]
  return client.query(sql, params)
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          status: 'error',
          message: 'error posting comment'
        });
      }
    })
    .then(result => {
      client.query(
        `SELECT title, comment FROM gifComment JOIN gifs ON gifs.gifid = gifComment.gifid WHERE commentid = ${result.rows[0].commentid} `,
        (error, result) => {
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
              gif_title: result.rows[0].title,
              comment: result.rows[0].comment
            }
          });
        }
      );
    })
    
}



exports.getGifById = (req, res, next) => {
  // const { title, imageUrl, date } = req.body

  const sql = 'SELECT * FROM gifs WHERE gifId = $1 VALUES;'
  const params = [parseInt(req.params.id)]
  return client.query(sql, params)
  .then(result => {
    res.status(200).json({
      status: "success",
      result: result
    })
  })
  .catch(error => {
    res.status(400).json({
      status: error
    })
  })
}

  // client.query(
  //   `SELECT gifcomment.user_id, commentid, firstname, lastname, comment FROM gifcomment JOIN users ON users.userid = gifcomment.userid  WHERE gifid = ${req.params.id}`,
  //   async (error, result) => {
  //     if (error) {
  //       return res.status(400).json({
  //         status: 'error',
  //         message: 'error retrieving gif comments from database'
  //       });
  //     }
  //     res.json({
  //       status: 'success',
  //       data: results.rows[0],
  //       comments: result.rows
  //     });
  //   }
  // );


exports.getAllGifs = (req, res, next) => {
  const sql = 'SELECT * FROM gifs ;'
  return client.query(sql)
  .then(result => {
    res.status(200).json({
      status: "success",
      result: result
    })
  })
  .catch(err => {
    res.statuscode(400)
  })
    
} 

exports.deleteGif = (req, res, next) => {

  const sql = 'DELETE FROM gifs WHERE gifId = $1 VALUES'
  const params = parseInt([req.params.id])
  return client.client(sql, params)
  .then(() => {
    res.status(200).json({
      status: 'success',
      data: {
        message: 'gif post deleted successfully'
      }
    });
  })
  .catch(() => {
    res.status(400).json({
      status: "success",
      data: {
        message: 'error deleting gif'
      }
      
    });
  })
  
};