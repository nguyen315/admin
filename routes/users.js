var express = require('express');
const userlistController = require('../controllers/users.controller');
var router = express.Router();
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

// router.get('/userlist', userlistController.index);
// router.post('/userlist', userlistController.index);
module.exports = router;