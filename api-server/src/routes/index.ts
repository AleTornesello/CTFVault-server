import * as express from "express";
import * as ctfRoutes from "./ctfRoutes";
import * as writeupRoutes from "./writeupRoutes";
import { githubRoutes } from "../github";

export const register = (app: express.Application): void => {
    ctfRoutes.register(app, "/ctfs");
    writeupRoutes.register(app, "/writeups");
    githubRoutes.register(app, "/github/hooks");
};