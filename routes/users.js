var express = require('express');
const userlistController = require('../controllers/users.controller');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
// router.get('/userlist', function(req, res) {
//     const list = [
//             { avatar: 'anh', firstName: 'luong', lastName: 'Nhan', username: 'luong nhan', password: 'luong trong nhan', email: 'asdasda' },
//             { avatar: 'anh', firstName: 'luong', lastName: 'Nhan', username: 'luong nhan', password: 'luong trong nhan', email: 'asdasda' },
//             { avatar: 'anh', firstName: 'luong', lastName: 'Nhan', username: 'luong nhan', password: 'luong trong nhan', email: 'asdasda' }
//         ]
//         //console.log(list);
//     res.render('userlist', {
//         userList: list
//     });
// });
router.get('/userlist', userlistController.getAlluser);
router.post('/userlist', userlistController.getAlluser);
module.exports = router;