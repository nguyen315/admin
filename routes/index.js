var express = require('express');
var router = express.Router();

const indexController = require('../controllers/index.controller')

/* GET home page. */
router.get('/', indexController.index);
router.get('/addProduct', indexController.addProductRender);
router.post('/addProduct', indexController.addProduct)
router.post('/deleteProduct', indexController.deleteProduct)
router.post('/updateProductRender', indexController.updateProductRender)
router.post('/updateProduct',indexController.updateProduct)
module.exports = router;
