import * as express from "express";
import { container } from "tsyringe";

import { attachControllers } from "../tsyringe-express";
import { GithubRoutes } from "../github";

import { ChallengeController } from '../controllers/challengeController';
import { CtfController } from '../controllers/ctfController';

export const register = (app: express.Application): void => {
    const githubRoutes = container.resolve(GithubRoutes);
    githubRoutes.register(app, `/api/${process.env.API_VERSION}/github/webhooks`);

    attachControllers(app, container, [CtfController, ChallengeController]);
};