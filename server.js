const mongoose = require('mongoose'),
  config = require('./config.json');

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(
    () => {
      console.log('Database is connected');
    },
    err => {
      console.log('Can not connect to the database' + err);
    }
  );
