import { Request, Response } from "express";

class GithubController {
  async push(req: Request, res: Response) {
    return res.json(req.body);
  }

  async issues(req: Request, res: Response) {
    return res.json(req.body);
  }
}

const githubController = new GithubController();
export default githubController;