enum GithubEventStatus {
    Pending = "pending",
    Completed = "completed",
    Failed = "failed"
}
interface GithubEvent {
    id: string;
    type: string;
    status: GithubEventStatus;
    data: unknown;
}

export { GithubEvent, GithubEventStatus };