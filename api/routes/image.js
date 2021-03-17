const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
   dest:'uploads/'
});

const ImageController = require('../controllers/imageController');

router.post('/upload', upload.single('image'), ImageController.uploadImage);

module.exports = router;
