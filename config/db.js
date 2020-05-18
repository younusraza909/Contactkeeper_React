const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      //We have to use these paramenters in order to avoid warning
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("MongoDb Connected ..");
  } catch (err) {
    console.log(err.message);
    //to exit with failure
    process.exit(1);
  }
};

module.exports = connectDB;
