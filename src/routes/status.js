const router = require('express').Router();
const statusController = require('../controllers/status')

router.get('/', statusController.get);

module.exports = router;