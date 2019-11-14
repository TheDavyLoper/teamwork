const express = require('express');
require('dotenv').config();
const cors = require('cors');



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

// Routes
// app.use('/api/v1/auth', authRoute);

// app.use('/api/v1/gifs', gifRoute);

// app.use('/api/v1/articles', articleRoute);

// app.use('/api/v1/feed', feedRoute);


const port = process.env.PORT;
app.listen(port, () => console.log(`App running on port ${port}`));

module.exports = { app };