const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const routerUser = require('./users/routes/user.routes');
const routerUrl = require('./urls/routes/url.routes');
const routerAuth = require('./auth/routes/auth.routes');
const { verifyToken } = require('./middlewares/verifyToken');

//settings
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 4);

//middlewares
app.use(cors({}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

app.use('/auth', routerAuth);
app.use('/users', verifyToken, routerUser);
app.use('/', routerUrl);

module.exports = app;
