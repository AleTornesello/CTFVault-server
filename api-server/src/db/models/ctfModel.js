const ctfSchema = require('../../db/schemas/ctfSchema')
const mongoose = require('mongoose');

module.exports = mongoose.model('Ctf', ctfSchema)