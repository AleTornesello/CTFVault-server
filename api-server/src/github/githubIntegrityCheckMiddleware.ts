import { Request, Response, NextFunction, RequestHandler } from "express";
import { BadRequest, Unauthorized } from "http-errors";
import { Webhooks } from '@octokit/webhooks';

function createGithubIntegrityCheckMiddleware(webhooks: Webhooks): RequestHandler {
  return (request: Request, response: Response, next: NextFunction) => {
    const signature = request.headers['x-hub-signature-256'] as string;
    if (!signature) next(new BadRequest('Missing signature'));

    webhooks.verify(request.body, signature)
      .then(isVaid => {
        if (!isVaid) next(new Unauthorized('Invalid signature'));
      })
      .finally(next);
  };
}

export { createGithubIntegrityCheckMiddleware };