import { GithubEvent } from './models/githubEvent';

interface GithubEventRepository {
    add(event: GithubEvent): void;
}

export { GithubEventRepository };