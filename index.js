const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env'),
});
require('./src/database');
const app = require('./src/app');

app.listen(app.get('port'), () => {
  console.log(`Server app is listening on por: ${process.env.BASE_URL} `);
});
