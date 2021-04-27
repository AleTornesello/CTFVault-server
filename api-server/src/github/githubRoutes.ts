import { Application, Router } from "express";
import { Webhooks } from '@octokit/webhooks';
import { WebhookEventName, WebhookEvent } from '@octokit/webhooks-types';

import { Logger } from '../helpers';
import { createGithubIntegrityCheckMiddleware } from './githubIntegrityCheckMiddleware';
import { createGithubEventsMiddleware } from './githubEventsMiddleware';
import { GithubEventRepository } from './githubEventRepository';
import * as webhooksEventHandlers from './githubWebhooks';
import { GithubEvent } from "./models/githubEvent";

interface WebHookEventHandler {
  eventName: WebhookEventName, handler: (id: string, eventName: string, payload: WebhookEvent) => void | Promise<void>;
}

const eventHandlers: WebHookEventHandler[] = [
  { eventName: 'push', handler: webhooksEventHandlers.push }
];

class RepositoryMock implements GithubEventRepository {
  add(event: GithubEvent): void {
    Logger.debug(event);
    return;
  }
}

const githubEventRepository = new RepositoryMock();

export const register = (app: Application, basePath: string): void => {
  const router = Router();
  app.use(basePath, router)

  const webhooks = new Webhooks({ log: Logger, secret: process.env.GITHUB_WEBHOOKS_SERCRET });

  router.use(createGithubIntegrityCheckMiddleware(webhooks));
  router.use(createGithubEventsMiddleware(webhooks, eventHandlers.map(h => h.eventName), githubEventRepository));

  eventHandlers.forEach(eventHandler => {
    webhooks.on(
      eventHandler.eventName,
      ({ id, name, payload }) => eventHandler.handler(id, name, payload));
  });
};