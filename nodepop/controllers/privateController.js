const { Usuario } = require('../models');

class PrivateController {

  async index(req, res, next) {
    try {
      
      const userId = req.session.logedUser;
  
      const user = await Usuario.findById(userId);

      if (!user) {
        next(new Error('Usuario no encontrado'));
        return;
      }

      res.render('private', {email: user.email});

    } catch(err) {
      next(err);
    }
  }

}

module.exports = PrivateController;