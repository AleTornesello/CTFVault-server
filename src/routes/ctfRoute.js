const router = require('express').Router();
const CtfController = require('../controllers/ctfController')

router.get('/all', CtfController.all);
router.get('/:id', CtfController.get);

module.exports = router;