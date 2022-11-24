module.exports.setFlash = function (req, res, next) {
  // locals is the cookie
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  next();
};
