const express = require('express');
const router = express.Router();

/*GET /about */
router.get('/', (req, res, next) => {
  res.render('about');
});

module.exports = router;