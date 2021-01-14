const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = (req, res, next) => {
  res.render('register', {
    title: 'Register'
  });
}

exports.postRegister = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;

  // check if exist username or not

  // save username and password to database
  await userModel.addUser(username, password, email, firstName, lastName);
  res.redirect('/login');
}

exports.login = (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  }
  res.render('login', {
    title: 'Login'
  });
}

exports.changePassword = async (req, res, next) => {
  // compare old password
  const checkPassword = await bcrypt.compare(req.body.oldPassword, req.user.password);
  if (!checkPassword) {
    // alert('Wrong old password');
    req.flash('error', 'Wrong old password');
    res.redirect('back');
  }
  else if (req.body.newPassword != req.body.checkNewPassword) {
    req.flash('error', 'password and check password not match');
    res.redirect('back');
  }
  else {
    bcrypt.hash(req.body.newPassword, saltRounds, async function(err, hash) {
      await userModel.updatePassword(req.user._id, hash);
    });
    req.flash('success', 'change password success');
    res.redirect('back');
  }
}

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/login');
}


