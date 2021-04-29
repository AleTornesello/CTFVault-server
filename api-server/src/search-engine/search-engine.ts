import { Logger } from '../helpers';
import { IndexingContent } from './models';



class SearchEngine {
    index(content: IndexingContent): Promise<void> {
        Logger.debug('Index file');
        Logger.debug(content);
        return Promise.resolve();
    }

    removeFromIndex(...names: string[]): Promise<void> {
        Logger.debug('Remove from index');
        Logger.debug(names);
        return Promise.resolve();
    }
}

export { SearchEngine };