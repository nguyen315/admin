const passport = require('./passport');

exports.ROLES = {
  admin: 'admin',
  customer: 'customer'
}

exports.auth = passport.authenticate('local', { failureRedirect: '/login' });

exports.checkRole = (...roles) => async (req, res, next) => {
  if (!roles) return next();
  if (!req.user) {
    res.redirect('/login');
  }
  const hasRole = roles.find(role => req.user.role === role);
  if (!hasRole) {
    console.log(100000);
    res.redirect('/logout');
  }
  return next();
}

exports.checkActive = () => {
  if (!req.user) {
    res.redirect('/login');
  }
  else {
    if (req.user.status != "active") {

    }
  }
}