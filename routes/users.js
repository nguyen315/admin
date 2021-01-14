var express = require('express');
const userlistController = require('../controllers/users.controller');
const userController = require('../controllers/user.controller');
var router = express.Router();
const authenticate = require('../authenticate/authenticate')

router.use(authenticate.checkRole(authenticate.ROLES.admin));
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/userlist', userlistController.getAlluser);
router.post('/userlist', userlistController.getAlluser);

router.get('/userlist/edit', userlistController.postIdUsers);
router.post('/userlist/edit', userlistController.updateUser);

router.get('/userlist/del', userlistController.getUserToDel);
router.post('/userlist/del', userlistController.delUser);

router.get('/adminlist', userlistController.getAlladmin);
router.post('/adminlist', userlistController.getAlladmin);

router.get('/userlist/updateStatus', userlistController.uploadStatus);
router.post('/userlist/updateStatus', userlistController.uploadStatus);

router.post('/changePassword', userController.changePassword);

module.exports = router;