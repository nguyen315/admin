var express = require('express');
var router = express.Router();

const productController = require('../controllers/product.controller')

/* GET home page. */
router.get('/', productController.index);
router.get('/category', productController.index);
router.get('/addProduct', productController.addProductRender);
router.post('/addProduct', productController.addProduct);
router.post('/deleteProduct', productController.deleteProduct);
router.post('/updateProductRender', productController.updateProductRender);
router.post('/updateProduct',productController.updateProduct);
router.get('/search', productController.index)
module.exports = router;
