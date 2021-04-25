import { Application, Router } from "express";
import expressAsyncHandler from "express-async-handler";

import { HTTP_STATUS_CODE, Logger } from "../../helpers";
import { githubIntegrityCheckMiddleware } from "../../middlewares";
import GithubHooksController from '../../controllers/githubHooksController';

export const register = (app: Application, basePath: string) => {
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
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: 'Missing Github event' });
    }
  })

  router.post('/push', expressAsyncHandler(GithubHooksController.push));
};