const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  nome: {
    type: String,
  },
  email: {
    type: String,
  },
  git: {
    type: String,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});
module.exports = mongoose.model("Usuario", Schema);
