import { GithubEvent, GithubEventStatus } from '../models/githubEvent';
import { Logger } from '../../helpers';

class GithubEventRepository {
    add(event: GithubEvent): Promise<string> {
        Logger.debug(event);
        return Promise.resolve(event.id);
    }

    get(eventId: string): Promise<GithubEvent> {
        const event: GithubEvent = { id: eventId, type: "push", status: GithubEventStatus.Pending, data: {} };
        return Promise.resolve(event);
    }

    update(event: GithubEvent): Promise<void> {
        Logger.debug(event);
        return Promise.resolve();
    }
}


export { GithubEventRepository };