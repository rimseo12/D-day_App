const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: { type: String, required: true },
    image_url: { type: String },
    expiration_date: { type: Date, default: Date.now },
    status: { type: String, default: "active" }
});

module.exports = mongoose.model("products", productsSchema);
