const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: { type: String, required: true },
  image_url: { type: String },
  expiration_date: { type: Date, default: Date.now },
  memo: { type: String },
  status: { type: String, default: "active" },
  created_date: { type: Date, default: Date.now },
},{
  versionKey: false
});

module.exports = mongoose.model("products", productsSchema);
