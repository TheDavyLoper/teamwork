const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/config');
const authRoute = require('./routes/authRoute')
const articleRoute = require('./routes/articleRoute')
const gifRoute = require('./routes/gifRoute')
const feedRoute = require('./routes/feedRoute')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());


app.use('/api/v1/auth/', authRoute);
app.use('/api/v1/articles', articleRoute);
app.use('/api/v1/gif', gifRoute);
app.use('/api/v1/', feedRoute)

const port = process.env.PORT;
app.listen(port, () => console.log(`App running on port ${port}`));

module.exports = app