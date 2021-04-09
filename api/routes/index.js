module.exports = function (app, Product) {
  const multer = require("multer");
  const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, Date.now() + "-" + fileName);
    },
  });
  const upload = multer({
    storage: storage,
  }).single("imageName");

  app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      }
        res.json({ message: "success upload", data: req.file });
    });
  });

  // GET ALL PRODUCTS
  app.get('/products', (req, res) => {
    Product.find((err, products) => {
      if (err) return res.status(500).send({ error: err });
      res.json(products);
    });
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
  app.post('/product/add', (req, res) => {
    let product = new Product({
      name: req.body.name,
      image_url: req.body.image_url,
      expiration_date: req.body.expiration_date,
      status: "active"
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
      if (req.body.status) product.status = req.body.status;

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
