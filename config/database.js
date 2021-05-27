const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connect_database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connect_database;
