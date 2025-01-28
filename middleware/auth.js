// Middleware/auth.js
exports.isAuth = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/signin');
  }
  next();
 };
 
 exports.isAdmin = (req, res, next) => {
  if (!req.session.isAuthenticated || req.session.user.role !== 'admin') {
    return res.redirect('/signin'); 
  }
  next();
 };