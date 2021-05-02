import { Request, Response } from "express";

import { injectable } from "tsyringe";
import { controller, action, HttpMethod } from "../tsyringe-express";

@controller({ route: `/api/${process.env.API_VERSION}/challenges` })
@injectable()
class ChallengeController {

  /**
   * Get all challenges, possible filter by name, writeup content, category, 
   * solver and tags
   */
  @action({ route: '/' })
  async all(req: Request, res: Response): Promise<void> {
    const name: string = req.query.name as string;
    const writeup_content: string = req.query.writeup_content as string;
    const category: string = req.query.category as string;
    const solved_by: string = req.query.solved_by as string;
    const tags: string = req.query.tags as string;
    return Promise.resolve();
  }

  /**
   * Get challenge detail
   */
  @action({ route: '/:id' })
  async get(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    return Promise.resolve();
  }

  /**
   * Create a challenge
   */
  @action({ route: '/', method: HttpMethod.POST })
  async post(req: Request, res: Response): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Update a challenge
   */
  @action({ route: '/:id', method: HttpMethod.PUT })
  async put(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    return Promise.resolve();
  }

  /**
   * Delete a challenge
   */
  @action({ route: '/:id', method: HttpMethod.DELETE })
  async delete(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    return Promise.resolve();
  }
}

export { ChallengeController };