const STATUS = require('../helpers/httpStatus').STATUS_CODE;
// const ApplicationError = require('../helpers/applicationError');

class CtfController {

  constructor() {}

  async all(req, res) {
    let filter = req.query.filter
    let limit = req.query.limit
    
    return res.status(STATUS.OK).json({
      filter: filter,
      limit: limit
    });
  }
}

module.exports = new CtfController();