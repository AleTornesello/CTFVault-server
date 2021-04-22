const router = require('express').Router();
const WriteupController = require('../controllers/writeupController')

router.get('/all', WriteupController.all);

module.exports = router;