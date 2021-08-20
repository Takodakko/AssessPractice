const express = require('express');
const router = express.Router();
const unclesController = require('../controllers/unclesController')

router.get('/', 
  unclesController.getUncles,
  (req, res) => res.status(200).json(res.locals.uncles)
);

router.post('/',
  unclesController.postUncle,
  (req, res) => res.status(200).json(res.locals.uncles)
);

router.put

router.delete

module.exports = router;