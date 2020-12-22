const userModel = require('../models/user.model');


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

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}
