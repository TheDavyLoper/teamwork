const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));




const port = process.env.PORT;
app.listen(port, () => console.log(`App running on port ${port}`));


