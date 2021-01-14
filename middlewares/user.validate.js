var userModel = require('../models/user.model')

module.exports.postRegister =  async function (req, res, next) {
    var errors = [];
    var username = req.body.username;
    var user = await userModel.getUserByUsername(username);
    console.log("USER", user);
    if (user) {
        errors.push('Username exited');
    }
    if(!req.body.email){
        errors.push('Email is require');
    }
    if (!req.body.username) {
        errors.push('Username is require');
    }
    if (!req.body.password) {
        errors.push('Password is require');
    }
    if (!req.body.retypePassword) {
        errors.push('Retype Password is require');
    }
    if (req.body.passWord != req.body.retypePassword) {
        errors.push(' Password not match');
    }
    if (errors.length) {
        res.render('register', {
            errors
        });
        return;
    }
    next();
}