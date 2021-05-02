import { Request, Response, NextFunction } from "express";
import { injectable } from "tsyringe";
import { NotFound } from "http-errors"

import { controller, action } from "../tsyringe-express";

@controller({ route: `/api/${process.env.API_VERSION}/ctfs` })
@injectable()
class CtfController {

  @action({ route: '/' })
  async all(req: Request, res: Response): Promise<void> {
    return Promise.resolve();
  }

  @action({ route: '/:id' })
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    return Promise.resolve();
  }
}

export { CtfController };