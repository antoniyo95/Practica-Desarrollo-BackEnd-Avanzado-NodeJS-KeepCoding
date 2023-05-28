const express = require('express');
const router = express.Router();

/*GET /change-locale */
router.get('/:locale', (req, res, next) => {

  const locale = req.params.locale;
  // Insertar una cookie en la respuesta que indique el nuevo locale al browser
  res.cookie('nodepop-locale', locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30
  })

  // Responder con una redirección a la página de donde venía la petición
  res.redirect(req.get('referer'));
});

module.exports = router;