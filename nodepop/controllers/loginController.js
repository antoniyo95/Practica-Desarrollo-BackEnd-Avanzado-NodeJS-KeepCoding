const { Usuario } = require("../models");
const jwt = require('jsonwebtoken');

class LoginController {
  index(req, res, next) {
    res.locals.error = "";
    res.locals.error = "";
    res.render("login");
  }

  // Login post desde el website
  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      // Buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email: email });

      // Si no encuentra o no coincide la contraseña >>> Error
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.locals.error = req.__("Credenciales inválidas");
        res.locals.email = email;
        res.render("login");
        return;
      }
      // Si existe y la contraseña coincide
      // Apuntar en la sesión del usuario, que está autenticado
      req.session.logedUser = usuario._id;

      // Redirigir a Zona Privada
      res.redirect('/private');
    } catch (err) {
      next(err);
    }
  }

  logout(req, res, next) {
    req.session.regenerate(err => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/');
    })
  }

  // Login post desde el API
  async postAPI(req, res, next) {
    try {
      const { email, password } = req.body;

      // Buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email: email });

      // Si no encuentra o no coincide la contraseña >>> Error
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.json({ error: 'invalidad credentials' });
        return;
      }
      // Si existe y la contraseña coincide
      // Crear un token JWT con el _id del usuario dentro
      const token = await jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
        expiresIn: '1m'
      })

      res.json({ jwt: token });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = LoginController;
