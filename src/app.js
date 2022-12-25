const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const routerUrl = require('./urls/routes/url');
const routerRedirect = require('./urls/routes/redirect');

//settings
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 4);

//middlewares
app.use(cors({}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/', routerRedirect);
app.use('/', routerUrl);

module.exports = app;
