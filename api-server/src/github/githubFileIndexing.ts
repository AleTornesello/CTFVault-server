import PromisePool from '@supercharge/promise-pool';

import { getFilenameExtension } from '../helpers';
import { SearchEngine, IndexingContent } from '../search-engine';
import { GithubContentRepository } from "./repositories/githubContentRepository";

interface GithubFileContent extends IndexingContent {
    githubRepositoryOwner: string,
    githubRepository: string,
    githubFilePath: string
}

class GithubFileIndexing {
    private fileTypeExtensions: string[] = ['md'];
    private repository = new GithubContentRepository();
    private searchEngine = new SearchEngine();

    async updateIndex(owner: string, repo: string, files: { added: string[], modified: string[], removed: string[] }): Promise<void> {
        await Promise.all([
            this.indexFiles(owner, repo, files.added.concat(files.modified)),
            this.removeFilesFromIndex(owner, repo, files.removed)
        ]);
    }

    async indexFiles(owner: string, repo: string, files: string[]): Promise<void> {
        const indexableFiles = this.removeNonIndexableFiles(files);
        const filesToBeProcessed = Array.from(new Set(indexableFiles));

        await PromisePool
            .for(filesToBeProcessed)
            .process(file => this.indexFile(owner, repo, file));
    }

    async indexFile(owner: string, repo: string, filePath: string): Promise<void> {
        const content = await this.repository.getContent(owner, repo, filePath);
        const githubFileContent: GithubFileContent = {
            name: this.getName(owner, repo, filePath),
            content: content,
            githubRepositoryOwner: owner,
            githubRepository: repo,
            githubFilePath: filePath
        };
        await this.searchEngine.index(githubFileContent);
    }

    private async removeFilesFromIndex(owner: string, repo: string, files: string[]): Promise<void> {
        const names = files.map(file => this.getName(owner, repo, file));
        await this.searchEngine.removeFromIndex(...names);
    }

    private getName(owner: string, repo: string, file: string): string {
        return `${owner}:${repo}:${file}`;
    }

    private removeNonIndexableFiles(files: string[]) {
        return files.filter(filename => {
            const extension = getFilenameExtension(filename);
            return this.fileTypeExtensions.includes(extension);
        });
    }
}
export { GithubFileIndexing };