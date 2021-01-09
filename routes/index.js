var express = require('express');
var router = express.Router();

const indexController = require('../controllers/index.controller');
const userController = require('../controllers/user.controller');
const passport = require('../authenticate/passport');
const authenticate = require('../authenticate/authenticate');
const { route } = require('./users');

/* GET home page. */
router.get('/', indexController.index);
router.get('/register', userController.register);
router.get('/login', userController.login);

router.post('/register', userController.postRegister);
router.post('/login', authenticate.auth, authenticate.checkRole(authenticate.ROLES.admin),
    (req, res) => {
        res.redirect('/');
    });
router.get('/logout', userController.logout);
module.exports = router;