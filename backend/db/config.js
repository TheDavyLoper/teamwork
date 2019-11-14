require('dotenv').config();
const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})
.then(()=>{
  console.log('Connection Successful');
})
.catch((err) => {
  console.log(err)
});

module.exports = { pool }


// const  client = new Client();

// client.connect()
// .then(()=>{
//   console.log('Connection Successful');
// })
// .catch((err) => {
//   console.log(err)
// });

// module.exports = client;

