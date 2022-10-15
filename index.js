require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
//const router = require('./src/url.js');
const app = express();

// Database config
const connection = require('./db.config');
connection.once('open', () => console.log('DB Connected'));
connection.on('error', () => console.log('Error'));

app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/', require('./src/redirect'));
app.use('/api/url', require('./src/url.js'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server app listening on port ${port}!`));
