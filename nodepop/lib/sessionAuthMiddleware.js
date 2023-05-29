// Módulo que exporta un middleware
module.exports = (req, res, next) => {
  if (!req.session.logedUser) {
    res.redirect('/login');
    return;
  }
  next();
}