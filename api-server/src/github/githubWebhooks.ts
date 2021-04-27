import { PushEvent } from '@octokit/webhooks-types';

function push(id: string, name: 'push', payload: PushEvent): void {
  return;
}

export { push };