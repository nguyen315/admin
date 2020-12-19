var express = require('express');
var router = express.Router();

const productController = require('../controllers/product.controller')

/* GET home page. */
router.get('/', productController.index);
router.get('/category', productController.index);
router.get('/addProduct', productController.addProduct);
router.get('/edit/:productId', productController.editProduct);
router.get('/delete/:productId', productController.deleteProduct);
router.get('/search', productController.index)


router.post('/addProduct', productController.postAddProduct);
router.post('/editProduct',productController.postEditProduct);



module.exports = router;
