import { Request, Response, NextFunction } from 'express';
import { BadRequest } from 'http-errors';
import { Logger } from '../helpers';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function githubEventsMiddleware(request: Request, response: Response, next: NextFunction): void {
  if (request.headers['x-github-event']) {
    request.url += `${request.headers['x-github-event']}`;
    Logger.debug(`Redirect Github Webhooks request to route ${request.url}`);
    next();
  }

  else throw new BadRequest('Missing Github event');
}

export { githubEventsMiddleware };