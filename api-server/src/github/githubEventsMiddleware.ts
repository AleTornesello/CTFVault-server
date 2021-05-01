import { injectable } from 'tsyringe';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { BadRequest } from 'http-errors';
import { Webhooks } from '@octokit/webhooks';


import { Logger } from '../helpers';
import { GithubEventRepository } from './repositories/githubEventRepository';
import { GithubEvent, GithubEventStatus } from './models/githubEvent';

@injectable()
class GithubEventsMiddlewareFactory {
  constructor(private webhooks: Webhooks, private githubEventRepository: GithubEventRepository) { }

  createMiddleware(subscribedEvents: string[]): RequestHandler {
    return (request: Request, response: Response, next: NextFunction) => {
      const eventId = request.headers["x-github-delivery"] as string;
      if (!eventId) return next(new BadRequest('Missing Github delivery'));

      const eventName = request.headers['x-github-event'] as string;
      if (!eventName) return next(new BadRequest('Missing Github event'));

      if (!subscribedEvents.includes(eventName)) return next(new BadRequest('Github event not supported'));

      const event: GithubEvent = { id: eventId, type: eventName, status: GithubEventStatus.Pending, data: request.body };
      this.githubEventRepository.add(event);

      // Send response to github before proceding or it will raise timeout.
      response.send();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.webhooks.receive({ id: eventId, name: eventName as any, payload: request.body })
        .catch(error => Logger.error(error));
    };
  }
}

export { GithubEventsMiddlewareFactory };