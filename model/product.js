const mongoose = require("mongoose");

const Prods_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
});

module.exports = Prod_Schema = mongoose.model("Prod_Schema", Prods_Schema);
