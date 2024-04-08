const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  description: String,
  provider: String,
  codeSnippet: String,
  likes: { type: Number, default: 0 },
  imageURL: String,
});

const Model = mongoose.model("Model", modelSchema);

module.exports = Model;
