const e = require('express');
const { render } = require('../app');
const userListModel = require('../models/user.model');

exports.getAlluser = async(req, res) => {
    const list = userListModel.getAllUserList();
    list.then(function(result) {
        //console.log(list);
        res.render('userlist', {
            userlist: result
        })
    })

}
exports.postIdUsers = async(req, res) => {
    const _id = req.query.id;
    const user = await userListModel.getUserById(_id);
    res.render('edit', {
        users: user
    })
}
exports.updateUser = async(req, res) => {
    const _id = req.query.id;
    const user = await userListModel.getUserById(_id);

    //console.log(user);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const updateuser = await userListModel.updateDaTaUser(_id, firstName, lastName, email);
    res.redirect('/users/userlist')
}
exports.getUserToDel = async(req, res) => {
    const _id = req.query.id;
    const user = await userListModel.getUserById(_id);
    console.log(user);
    res.render('del', {
        users: user
    });
}
exports.delUser = async(req, res) => {
    const _id = req.query.id;
    const user = await userListModel.getUserById(_id);
    console.log(user);
    console.log("bat dau thuc thi");
    var delUser = await userListModel.delUser(_id);
    res.redirect('/users/userlist');
}