const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  devs: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Game", gameSchema);


