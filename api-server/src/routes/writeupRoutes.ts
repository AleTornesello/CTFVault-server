import { Application, Router } from "express";
import WriteupController from '../controllers/writeupController';

export const register = (app: Application, basePath: string) => {
    const router = Router();
    app.use(basePath, router)

    router.get('/', WriteupController.all);
};