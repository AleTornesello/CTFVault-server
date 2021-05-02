import { Request, Response, NextFunction } from "express";
import { injectable } from "tsyringe";
import { NotFound } from "http-errors"

import { controller, action, HttpMethod } from "../tsyringe-express";

@controller({ route: `/api/${process.env.API_VERSION}/ctfs` })
@injectable()
class CtfController {

  /**
   * Get all the CTFs, possible search by name
   */
  @action({ route: '/' })
  async all(req: Request, res: Response): Promise<void> {
    const name: string = req.query.name as string;
    return Promise.resolve();
  }

  /**
   * Get the detail of a CTF
   */
  @action({ route: '/:id' })
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: string = req.params.id;
    return Promise.resolve();
  }

  /**
   * Create a CTF
   */
  @action({ route: '/', method: HttpMethod.POST })
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Update a CTF
   */
  @action({ route: '/:id', method: HttpMethod.PUT })
  async put(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: string = req.params.id;
    return Promise.resolve();
  }

  /**
   * Delete a CTF
   */
  @action({ route: '/:id', method: HttpMethod.DELETE })
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: string = req.params.id;
    return Promise.resolve();
  }
}

export { CtfController };