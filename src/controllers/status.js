const STATUS = require('../helpers/httpStatus').STATUS_CODE;

class StatusController {

  constructor() {}

  async get(req, res) {
    return res.status(STATUS.OK).json({message: 'hello world!'})
  }
}

module.exports = new StatusController();