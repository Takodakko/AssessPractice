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

router.put('/:id',
  unclesController.editUncle,
  (req, res) => res.status(200).json(res.locals.uncle)
)

router.delete('/:id',
  unclesController.deleteUncle,
  (req, res) => res.status(200).json(res.locals.deleted)
);

module.exports = router;