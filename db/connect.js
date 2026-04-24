const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url, {
    dbName : "store_api",
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
}

module.exports = connectDB;
