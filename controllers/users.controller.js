const e = require('express');
const { render } = require('../app');
const userListModel = require('../models/user.model');
const categoryModel = require('../models/category.model');

exports.getAlluser = async(req, res) => {
    const page = +req.query.page || 1;
    const perPage = 6;

    const users = await userListModel.list({ role: "customer" }, page, perPage);
    const num = await userListModel.getNumOfUsers();

    let hasNextPage, hasPrevPage;
    hasPrevPage = page > 1 ? true : false;
    if (num > ((page - 1) * perPage + users.length))
        hasNextPage = true;
    else
        hasNextPage = false;


    res.render('userlist', {
        userlist: users,
        hasNextPage,
        hasPrevPage,
        currentPage: page,

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
    res.redirect('/')
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
    res.redirect('/');
}
exports.index = async(req, res, next) => {

    const page = +req.query.page || 1;
    const perPage = 6;

    const users = await userListModel.list(page, perPage);
    const num = await userListModel.getNumOfUsers();
    console.log(num);
    console.log(page)

    res.render('userlist', {
        users: users
    })
}
exports.getAlladmin = async(req, res) => {
    const page = +req.query.page || 1;
    const perPage = 6;

    const admin = await userListModel.list({ role: "admin" }, page, perPage);
    const num = await userListModel.getNumOfUsers();
    console.log(num);
    console.log(page);

    let hasNextPage, hasPrevPage;
    hasPrevPage = page > 1 ? true : false;
    if (num > ((page - 1) * perPage + admin.length))
        hasNextPage = true;
    else
        hasNextPage = false;


    res.render('adminlist', {
        userlist: admin,
        hasNextPage,
        hasPrevPage,
        currentPage: page,

    })

}