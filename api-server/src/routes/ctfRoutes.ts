import { Application, Router } from "express";
import CtfController from '../controllers/ctfController';

export const register = (app: Application, basePath: string) => {
    const router = Router();
    app.use(basePath, router)
    router.get('/', CtfController.all);
    router.get('/:id', CtfController.get);
};