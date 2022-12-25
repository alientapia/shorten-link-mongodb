require('dotenv').config();
const app = require('./src/app');
require('./database');

app.listen(app.get('port'), () =>
  console.log(`Server app listening on port ${app.get('port')}!`)
);
