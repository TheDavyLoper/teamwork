const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoute = require('./routes/authRoute')
const articleRoute = require('./routes/articleRoute')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

app.use('/api/v1/auth/', authRoute);
app.use('/api/v1/article', articleRoute);


const port = process.env.PORT;
app.listen(port, () => console.log(`App running on port ${port}`));

module.exports = app