import { BadRequest } from 'http-errors';
import { Application, Router } from "express";
import expressAsyncHandler from "express-async-handler";

import { Logger } from "../../helpers";
import { githubIntegrityCheckMiddleware } from "../../middlewares";
import GithubHooksController from '../../controllers/githubHooksController';

export const register = (app: Application, basePath: string): void => {
  const router = Router();
  app.use(basePath, router)

  router.use(githubIntegrityCheckMiddleware)
  // Github webhooks routing
  router.use((req, res, next) => {
    if (req.headers['x-github-event']) {
      req.url += `${req.headers['x-github-event']}`
      Logger.debug(`Redirect Github Webhooks request to route ${req.url}`);
      next();
    } else {
      return new BadRequest('Missing Github event');
    }
  })

  router.post('/push', expressAsyncHandler(GithubHooksController.push));
};