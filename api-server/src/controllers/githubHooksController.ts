import { Request, Response } from "express";

class GithubHooksController {
  async push(req: Request, res: Response) {
    return res.json(req.body);
  }

  async issues(req: Request, res: Response) {
    return res.json(req.body);
  }
}

const githubHooksController = new GithubHooksController();
export default githubHooksController;