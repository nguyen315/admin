const { render } = require('../app');
const userListModel = require('../models/user.model');

exports.getAlluser = async(req, res) => {
    const list = userListModel.getAllUserList();
    list.then(function(result) {
        console.log(list);
        res.render('userlist', {
            userlist: result
        })
    })

}