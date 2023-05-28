const { Usuario } = require("../models");

class LoginController {
  index(req, res, next) {
    res.locals.error = "";
    res.locals.error = "";
    res.render("login");
  }

  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      // Buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email: email });

      // Si no encuentra o no coincide la contraseña >>> Error
      if (!usuario || usuario.password !== password) {
        res.locals.error = req.__("Credenciales inválidas");
        res.locals.email = email;
        res.render("login");
        return;
      }
      // Si existe y la contraseña coincide >>> Redirigir a Zona Privada
      res.redirect('/private');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
