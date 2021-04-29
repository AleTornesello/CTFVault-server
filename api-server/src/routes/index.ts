import * as express from "express";
import * as ctfRoutes from "./ctfRoutes";
import * as writeupRoutes from "./writeupRoutes";
import { githubRoutes } from "../github";

export const register = (app: express.Application): void => {
    ctfRoutes.register(app, "/api/ctfs");
    writeupRoutes.register(app, "/api/writeups");
    githubRoutes.register(app, "/api/github/webhooks");
};