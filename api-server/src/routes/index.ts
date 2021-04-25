import * as express from "express";
import * as ctfRoutes from "./ctfRoutes";
import * as writeupRoutes from "./writeupRoutes";
import * as githubRoutes from "./github/hooksRoutes";

export const register = (app: express.Application) => {
    ctfRoutes.register(app, "/ctfs");
    writeupRoutes.register(app, "/writeups");
    githubRoutes.register(app, "/github/hooks");
};