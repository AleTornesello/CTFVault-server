import { Octokit } from '@octokit/core'
import { Logger } from '../../helpers'

export class GithubContentRepository {

    private octokit = new Octokit({
        // auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        log: Logger
    });

    async getContent(owner: string, repo: string, path: string): Promise<string> {
        const response = await this.octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            headers: { accept: 'application/vnd.github.v3.raw' },
            owner: owner,
            repo: repo,
            path: path
        });
        return response.data as unknown as string;
    }
}