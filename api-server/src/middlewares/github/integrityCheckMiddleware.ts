import { Response } from "express";
import crypto from "crypto"
import HTTP_STATUS_CODE from "../../helpers/httpStatusCode"

const SHA256_HEADER = 'x-hub-signature-256';

function githubIntegrityCheckMiddleware(request: any, response: Response, next: any) {
  if (request.headers[SHA256_HEADER]) {
    const sha256Signature: string = request.headers[SHA256_HEADER].replace('sha256=', '');

    const bodySha256 = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOKS_SERCRET)
      .update(request.rawBody)
      .digest('hex');

    if (sha256Signature === bodySha256) {
      next();
    } else {
      return response.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({ error: 'Invalid signature' });
    }
  } else {
    return response.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: 'Missing signature' });
  }
}

export default githubIntegrityCheckMiddleware;