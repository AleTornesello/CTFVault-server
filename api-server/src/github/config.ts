import { Webhooks } from "@octokit/webhooks";
import { container } from "tsyringe";
import { Logger } from "../helpers";
import { GithubFileIndexing } from "./githubFileIndexing";
import { GithubEventRepository } from "./repositories/githubEventRepository";

export function registerDependencies(): void {
    container.registerInstance(Webhooks, new Webhooks({ log: Logger, secret: process.env.GITHUB_WEBHOOKS_SERCRET }));
    container.register(GithubFileIndexing, GithubFileIndexing);
    container.register(GithubEventRepository, GithubEventRepository);
}