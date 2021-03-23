require('dotenv').config();

const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(express.static("public"));

const port = process.env.PORT || 8080;
const server = app.listen(port, function() {
    console.log("Server is working-PORT:", server.address().port);
});

mongoose
.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Successfully connected to mongodb"))
.catch((e) => console.log(e));

const Product = require('./models/products');
const router = require('./routes')(app, Product);

const cors = require('cors');
app.use(cors()); //브라우저 cors 허용


