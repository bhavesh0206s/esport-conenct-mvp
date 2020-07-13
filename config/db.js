const mongoose = require('mongoose');
const keys = require('./keys')

const connectDB = async () => {
  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Database connected...');
  } catch (err) {
    console.error(err.message);
    //  Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
