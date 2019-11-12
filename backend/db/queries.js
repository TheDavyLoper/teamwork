require('dotenv').config();
const { Client } = require('pg');
const  client = new Client();

client.connect()
.then(()=>{
  console.log('Connection Successful');
})
.catch((err) => {
  console.log(err)
});

module.exports = client;

