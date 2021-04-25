import { Application, Router } from "express";
import expressAsyncHandler from 'express-async-handler'

import CtfController from '../controllers/ctfController';

export const register = (app: Application, basePath: string): void => {
    const router = Router();
    app.use(basePath, router)
    router.get('/', expressAsyncHandler(CtfController.all));
    router.get('/:id', expressAsyncHandler(CtfController.get));
};