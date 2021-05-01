import { Request, Response, NextFunction, RequestHandler } from "express";
import { BadRequest, Unauthorized } from "http-errors";
import { Webhooks } from '@octokit/webhooks';
import { Logger } from "../helpers";

function createGithubIntegrityCheckMiddleware(webhooks: Webhooks): RequestHandler {
  return (request: Request, response: Response, next: NextFunction) => {
    const signature = request.headers['x-hub-signature-256'] as string;
    if (!signature) return next(new BadRequest('Missing signature'));

    Logger.debug('Verify signature');
    webhooks.verify(request.body, signature)
      .then(isVaid => {
        if (!isVaid) return next(new Unauthorized('Invalid signature'));
      })
      .finally(next);
  };
}

export { createGithubIntegrityCheckMiddleware };