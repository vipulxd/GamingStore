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
  price: {
    type: String,
  },
  image: {type: String, required: true},
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = Prod_Schema = mongoose.model("Prod_Schema", Prods_Schema);
