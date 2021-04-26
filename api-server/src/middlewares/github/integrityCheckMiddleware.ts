import crypto from "crypto"
import { Response, NextFunction } from "express";
import { BadRequest, Unauthorized } from "http-errors";

const SHA256_HEADER = 'x-hub-signature-256';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function githubIntegrityCheckMiddleware(request: any, response: Response, next: NextFunction): void {
  if (request.headers[SHA256_HEADER]) {
    const sha256Signature: string = request.headers[SHA256_HEADER].replace('sha256=', '');

    const bodySha256 = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOKS_SERCRET)
      .update(request.rawBody)
      .digest('hex');

    if (sha256Signature === bodySha256) {
      next();
    } else {
      throw new Unauthorized('Invalid signature');
    }
  } else {
    throw new BadRequest('Missing signature');
  }
}

export default githubIntegrityCheckMiddleware;