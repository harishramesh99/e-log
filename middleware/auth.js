exports.isAuth = (req, res, next) => {
    if (!req.session.isAuthenticated) {
      return res.redirect('/signin');
    }
    next();
  };
  