import { Request, Response, NextFunction, RequestHandler } from 'express';
import { BadRequest } from 'http-errors';
import { Webhooks } from '@octokit/webhooks';

import { Logger } from '../helpers';
import { GithubEventRepository } from './repositories/githubEventRepository';
import { GithubEvent, GithubEventStatus } from './models/githubEvent';


const githubEventRepository = new GithubEventRepository();

function createGithubEventsMiddleware(webhooks: Webhooks, subscribedEvents: string[]): RequestHandler {
  return (request: Request, response: Response, next: NextFunction) => {
    const eventId = request.headers["x-github-delivery"] as string;
    if (!eventId) next(new BadRequest('Missing Github delivery'));

    const eventName = request.headers['x-github-event'] as string;
    if (!eventName) next(new BadRequest('Missing Github event'));

    if (!subscribedEvents.includes(eventName)) next(new BadRequest('Github event not supported'));

    const event: GithubEvent = { id: eventId, type: eventName, status: GithubEventStatus.Pending, data: request.body };
    githubEventRepository.add(event);

    // Send response to github before proceding or it will raise timeout.
    response.send();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webhooks.receive({ id: eventId, name: eventName as any, payload: request.body })
      .catch(error => Logger.error(error));
  };
}

export { createGithubEventsMiddleware };