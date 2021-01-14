var express = require('express');
const userlistController = require('../controllers/users.controller');
var router = express.Router();
const authenticate = require('../authenticate/authenticate')

router.use(authenticate.checkRole(authenticate.ROLES.admin));
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/users/userlist', userlistController.getAlluser);
router.post('/users/userlist', userlistController.getAlluser);

router.get('/users/userlist/edit', userlistController.postIdUsers);
router.post('/users/userlist/edit', userlistController.updateUser);
router.get('/users/userlist/del', userlistController.getUserToDel);
router.post('/users/userlist/del', userlistController.delUser);

router.get('/adminlist', userlistController.getAlladmin);
router.post('/adminlist', userlistController.getAlladmin);

router.get('/users/userlist/updateStatus', userlistController.uploadStatus);
router.post('/users/userlist/updateStatus', userlistController.uploadStatus);

module.exports = router;