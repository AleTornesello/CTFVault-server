const crypto = require("crypto")
const STATUS = require('../../helpers/httpStatus').STATUS_CODE;

class IntegrityCheck {
  valid(req, res, next) {
    if(req.headers['x-hub-signature-256']) {
      const headerSha256 = req.headers['x-hub-signature-256'].replace('sha256=', '');

      const bodySha256 = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOKS_SERCRET)
          .update(req.rawBody)
          .digest('hex');

      if(headerSha256 === bodySha256) {
        next();
      } else {
        return res.status(STATUS.UNAUTHORIZED).json({ error: 'Invalid signature' });
      }
    } else {
      return res.status(STATUS.BAD_REQUEST).json({ error: 'Missing signature' });
    }
  }
}

module.exports = new IntegrityCheck()