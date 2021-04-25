import { Application, Router } from "express";
import expressAsyncHandler from "express-async-handler";

import WriteupController from '../controllers/writeupController';

export const register = (app: Application, basePath: string): void => {
    const router = Router();
    app.use(basePath, router)

    router.get('/', expressAsyncHandler(WriteupController.all));
};