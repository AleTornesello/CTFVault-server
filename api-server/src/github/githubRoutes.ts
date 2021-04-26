import { BadRequest } from 'http-errors';
import { Application, Router } from "express";
import expressAsyncHandler from "express-async-handler";

import { Logger } from "../helpers";
import { githubIntegrityCheckMiddleware } from './githubIntegrityCheckMiddleware';
import { githubEventsMiddleware } from './githubEventsMiddleware';
import GithubHooksController from './githubController';

export const register = (app: Application, basePath: string): void => {
  const router = Router();
  app.use(basePath, router)

  router.use(githubIntegrityCheckMiddleware);
  router.use(githubEventsMiddleware);

  router.post('/push', expressAsyncHandler(GithubHooksController.push));
};