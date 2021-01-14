const passport = require('./passport');

exports.ROLES = {
  admin: 'admin',
  customer: 'customer'
}

exports.auth = passport.authenticate('local', { failureRedirect: '/login' , failureFlash : true});

exports.checkRole = (...roles) => async (req, res, next) => {
  if (!roles) return next();
  if (!req.user) {
    res.redirect('/login');
  }
  const hasRole = roles.find(role => req.user.role === role);
  if (!hasRole) {
    res.redirect('/logout');
  }
  return next();
}

exports.checkActive = () => (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  }
  else if (req.user.status != "active") {
    req.flash('active', 'Your account is inactive');
    res.redirect('/logout');
  }
  return next();
}