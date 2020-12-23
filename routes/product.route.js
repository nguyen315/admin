var express = require('express');
var router = express.Router();
const productController = require('../controllers/product.controller');
const categoryController = require('../controllers/category.controller');
const authenticate = require('../authenticate/authenticate')
const { route } = require('./users');

/* GET home page. */
router.use(authenticate.checkRole(authenticate.ROLES.admin));

router.get('/', productController.index);
router.get('/category', productController.index);
router.get('/addProduct', productController.addProduct);
router.get('/edit/:productId', productController.editProduct);
router.get('/delete/:productId', productController.deleteProduct);
router.get('/search', productController.index);

router.get('/addCategory', categoryController.addCategory);


router.post('/addProduct', productController.postAddProduct);
router.post('/editProduct', productController.postEditProduct);

router.post('/addCategory', categoryController.postAddCategory);

module.exports = router;