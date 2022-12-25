const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const routerRedirect = require('./redirect');
const routerUrl = require('./url');

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
app.use('/api/url', routerUrl);

module.exports = app;
