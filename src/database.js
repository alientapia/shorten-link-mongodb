const mongoose = require('mongoose');

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) =>
    console.log(`\x1b[32mDatabase is connected to "${db.connection.name}"`)
  )
  .catch((err) => console.log(err));
