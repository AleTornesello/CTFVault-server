import { injectable } from "tsyringe";
import { PushEvent } from '@octokit/webhooks-types';

import { Logger } from '../helpers';
import { GithubFileIndexing } from './githubFileIndexing';
import { GithubEventStatus } from './models/githubEvent';
import { GithubEventRepository } from './repositories/githubEventRepository';


@injectable()
class GithubWebhooks {

  constructor(
    private fileIndexing: GithubFileIndexing,
    private eventRepository: GithubEventRepository) { }

  async push(eventId: string, eventName: string, payload: PushEvent): Promise<void> {
    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const addedFiles = payload.commits.flatMap(commit => commit.added);
    const modifiedFiles = payload.commits.flatMap(commit => commit.modified);
    const removedFiles = payload.commits.flatMap(commit => commit.removed);

    const indexUpdate = this.fileIndexing.updateIndex(owner, repo, {
      added: addedFiles,
      modified: modifiedFiles,
      removed: removedFiles
    });
    const event = await this.eventRepository.get(eventId);
    if (event != null) {
      await indexUpdate
        .then(() => event.status = GithubEventStatus.Completed)
        .catch(e => {
          Logger.warn(`Github file indexing failed with the following error:\n${e}`);
          event.status = GithubEventStatus.Failed;
        });
      await this.eventRepository.update(event);
    }
    else Logger.warn(`Missing event with id ${eventId}.`);
  }
}

export { GithubWebhooks };