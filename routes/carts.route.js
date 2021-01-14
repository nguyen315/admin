var express = require('express');
var router = express.Router();
const cartsController = require('../controllers/carts.controller')

const authenticate = require('../authenticate/authenticate');
router.use(authenticate.checkActive());
router.use(authenticate.checkRole(authenticate.ROLES.admin));

router.get('/', cartsController.index);
router.get('/category', cartsController.index);
router.get('/cancel/:id', cartsController.cancleCart);
router.get('/process/:id', cartsController.processCart);

module.exports = router;