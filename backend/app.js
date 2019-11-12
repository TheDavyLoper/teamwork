const express = require('express');
const authRoute = require('./routes/authRoute');
const client = require('./db/queries')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/api/v1/auth/create-user', authRoute)
// app.use('/api/v1/articles', articleRoute);
// app.use('/api/v1/gifs', gifRoute);
// app.use('/api/v1/feed', feedRoute);


const port = process.env.PORT;
app.listen(port, () => console.log(`App running on port ${port}`));


