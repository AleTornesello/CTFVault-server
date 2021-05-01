import { injectable } from 'tsyringe';
import { singleton } from 'tsyringe';
import { Application, Router } from "express";
import { Webhooks } from '@octokit/webhooks';
import { WebhookEventName, WebhookEvent, PushEvent } from '@octokit/webhooks-types';

import { createGithubIntegrityCheckMiddleware } from './githubIntegrityCheckMiddleware';
import { GithubEventsMiddlewareFactory } from './githubEventsMiddleware';
import { GithubWebhooks } from './githubWebhooks';

interface WebHookEventHandler {
  eventName: WebhookEventName, handler: (event: { id: string, eventName: string, payload: WebhookEvent }) => void | Promise<void>;
}
@injectable()
class GithubRoutes {

  private eventHandlers: WebHookEventHandler[] = [
    { eventName: 'push', handler: ({ id, eventName, payload }) => this.webhooksEventHandlers.push(id, eventName, payload as PushEvent) }
  ];

  constructor(
    private webhooks: Webhooks,
    private webhooksEventHandlers: GithubWebhooks,
    private githubEventMiddlewareFactory: GithubEventsMiddlewareFactory) {
  }

  register = (app: Application, basePath: string): void => {
    const router = Router();
    app.use(basePath, router)

    router.use(createGithubIntegrityCheckMiddleware(this.webhooks));
    router.use(this.githubEventMiddlewareFactory.createMiddleware(this.eventHandlers.map(h => h.eventName)));

    this.eventHandlers.forEach(eventHandler => {
      this.webhooks.on(
        eventHandler.eventName,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        eventHandler.handler as any);
    });
  };
}

export { GithubRoutes };