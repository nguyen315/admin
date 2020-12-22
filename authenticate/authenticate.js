const passport = require('./passport');

exports.ROLES = {
  admin: 'admin',
  customer: 'customer'
}

exports.auth = passport.authenticate('local', { failureRedirect: '/login' });

exports.checkRole = (...roles) => async (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  }
  const hasRole = roles.find(role => req.user.role === role);
  if (!hasRole) {
    res.redirect('/login');
  }
  return next();
}