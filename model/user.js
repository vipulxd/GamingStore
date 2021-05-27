const mongoose = require("mongoose");

const Users_Schema = new mongoose.Schema({
  _user_id: {
    type: String,
    required: true,
  },
  products: [
    {
      prod_id: {
        type: String,
      },
    },
  ],
});

module.exports = User_Schema = mongoose.model("User_Schema", Users_Schema);
