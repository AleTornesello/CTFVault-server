const STATUS = require('../helpers/httpStatus').STATUS_CODE;
// const ApplicationError = require('../helpers/applicationError');

class GithubHooksController {

  constructor() {}

  async push(req, res) {    
    console.log('push');
    return res.status(STATUS.OK).json(req.body);
  }

  async issues(req, res) {    
    return res.status(STATUS.OK).json(req.body);
  }
}

module.exports = new GithubHooksController();