module.exports = function (app, Product) {
  const multer = require("multer");
  const multerS3 = require('multer-s3');
  const AWS = require("aws-sdk");

  const s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  const upload = multer({
    storage: multerS3({
      s3: s3bucket,
      bucket: process.env.S3_BUCKET_NAME,
      key: function(req, file, cb){
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, Date.now() + "-" + fileName);
      },
      acl: "public-read"
    })
  });

  app.post('/upload', upload.single("imageName"), (req, res, next) => {
    console.log(req.file)
    const returnData = {
      signedRequest: req.file,
      url: `https://${s3bucket}.s3.amazonaws.com/${req.file.location}`
    }
    res.write(JSON.stringify(returnData));
    res.end();
  });

  // GET ALL PRODUCTS
  app.get('/products', (req, res) => {
    Product.find((err, products) => {
      if (err) return res.status(500).send({ error: err });
      res.json(products);
    }).sort({"expiration_date": 1});
  });

  // GET SINGLE PRODUCT
  app.get('/products/:product_id', (req, res) => {
    Product.findOne(({ _id: req.params.product_id }), (err, product) => {
      if (err) return res.status(500).json({ error: err });
      if (!product) return res.status(404).json({ error: "product not found" });
      res.json(product);
    });
  });

  // CREATE SINGLE PRODUCT
  app.post('/products', (req, res) => {
    let product = new Product({
      name: req.body.name,
      image_url: req.body.image_url,
      expiration_date: req.body.expiration_date,
      memo: req.body.memo,
      status: "active",
      created_date: req.body.created_date,
    });
    product.save((err) => {
      if (err) {
        console.log(err);
        res.json({ err: "error creating new product" });
        return;
        }
      res.json(product);
      });
    });

  // UPDATE PRODUCT
  app.put('/products/:product_id', (req, res) => {
    Product.findById(req.params.product_id, function (err, product) {
      if (err) return res.status(500).json({ error: "database failure" });
      if (!product) return res.status(404).json({ error: "Product not found" });

      if (req.body.name) product.name = req.body.name;
      if (req.body.image_url) product.image_url = req.body.image_url;
      if (req.body.expiration_date) product.expiration_date = req.body.expiration_date;
      if (req.body.memo) product.memo = req.body.memo;
      if (req.body.status) product.status = req.body.status;
      if (req.body.created_date) product.created_date = req.body.created_date;

      product.save((err) => {
        if (err) res.status(500).json({ error: "failed to update" });
          res.json({ message: "product updated" });
      });
    });
  });

  // DELETE PRODUCT
  app.delete('/products/:product_id', (req, res) => {
    Product.deleteOne({ _id: req.params.product_id }, function (err) {
      if (err) return res.status(500).json({ error: "database failure " });
        res.json({ message: "product deleted" });
      });
    });
  };
