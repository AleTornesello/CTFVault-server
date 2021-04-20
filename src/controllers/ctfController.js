const STATUS = require('../helpers/httpStatus').STATUS_CODE;
const CtfModel = require('../db/models/ctfModel')
// const ApplicationError = require('../helpers/applicationError');

class CtfController {

  constructor() {}

  async all(req, res) {
    try {
      CtfModel.find({}).select({ name: 1 }).exec().then((ctfs) => {
        return res.status(STATUS.OK).json(ctfs);
      }).catch(() => {
        return res.status(STATUS.NOT_FOUND).json({ error: 'Ctfs not found' });
      });
    } catch(error) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: error });
    }
  }

  async get(req, res) {
    try {
      CtfModel.findById(req.params.id).exec().then((ctf) => {
        return res.status(STATUS.OK).json(ctf);
      }).catch(() => {
        return res.status(STATUS.NOT_FOUND).json({ error: 'Ctf not found' });
      });
    } catch(error) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: error });
    }
  }
}

module.exports = new CtfController();