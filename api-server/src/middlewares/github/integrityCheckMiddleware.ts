import { Response, NextFunction } from "express";
import crypto from "crypto"
import createHttpError from "http-errors"
import { HTTP_STATUS_CODE } from "../../helpers"

const SHA256_HEADER = 'x-hub-signature-256';

function githubIntegrityCheckMiddleware(request: any, response: Response, next: NextFunction): void {
  if (request.headers[SHA256_HEADER]) {
    const sha256Signature: string = request.headers[SHA256_HEADER].replace('sha256=', '');

    const bodySha256 = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOKS_SERCRET)
      .update(request.rawBody)
      .digest('hex');

    if (sha256Signature === bodySha256) {
      next();
    } else {
      throw createHttpError(HTTP_STATUS_CODE.UNAUTHORIZED, 'Invalid signature');
    }
  } else {
    throw createHttpError(HTTP_STATUS_CODE.BAD_REQUEST, 'Missing signature');
  }
}

export default githubIntegrityCheckMiddleware;