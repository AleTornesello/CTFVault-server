interface GithubEvent {
    id: string;
    type: string;
    data: unknown;
}

export { GithubEvent };