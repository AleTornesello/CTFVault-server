import { Request, Response } from "express";

import { injectable } from "tsyringe";
import { controller, action } from "../tsyringe-express";

@controller({ route: `/api/${process.env.API_VERSION}/writeups` })
@injectable()
class WriteupController {
  @action({ route: '/' })
  async all(req: Request, res: Response): Promise<Response> {
    const filter = req.query.filter
    const limit = req.query.limit

    return res.json({
      filter,
      limit
    });
  }
}

export { WriteupController };