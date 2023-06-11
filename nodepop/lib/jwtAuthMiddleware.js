const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// Módulo que exporta un middleware
module.exports = async (req, res, next) => {
  try {

  // Recoger el jwtToken de la cabecera, o del body o de la query string
  const jwtToken = req.get('Authorization') || req.body.jwt || req.query.jwt;

  // Comprobar que me han mandado un jwtToken
  if (!jwtToken) {
    const error = createError(401, 'No token provided')
    next(error);
    return;
  }

  // Comprobar que el token es válido
  const payload = jwt.verify(jwtToken, process.env.JWT_SECRET)

  req.logedApiUser = payload._id;

  next();

  } catch(err) {
    if (err.message === 'invalid signature') {
      next(createError(401, 'Invalid token'));
      return;
    }
    next(err);
  }
}