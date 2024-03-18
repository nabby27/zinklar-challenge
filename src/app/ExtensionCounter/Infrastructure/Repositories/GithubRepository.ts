import { URLValueObject } from '../../Domain/VOs/URLValueObject';
import { PlatformRepository } from '../../Domain/Repositories/PlatformRepository';
import { ExtensionCount } from '../../Domain/VOs/ExtensionCount';
import { GitHubURLValueObject } from './GitHubURLValueObject';
import { GithubTree, GithubTreeItem } from './GithubTree';

export class GithubRepository implements PlatformRepository {

    constructor() {}

    public async getExtensionCount(repositoryURL: URLValueObject): Promise<ExtensionCount> {
        const extensionCount = ExtensionCount.create();

        const githubRepositoryURL = new GitHubURLValueObject(repositoryURL.value);

        const tree = await this.getTree({
            owner: githubRepositoryURL.owner,
            repo: githubRepositoryURL.repo,
            sha: 'HEAD',
        });

        await this.addExtensions(extensionCount, tree);

        return extensionCount;
    }

    private async getTree({ owner, repo, sha }: {owner: string, repo: string, sha: string}): Promise<GithubTree> {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${sha}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        });

        return response.json() as unknown as GithubTree;
    }

    private async getTreeByURL(url: string): Promise<GithubTree> {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        });

        return response.json() as unknown as GithubTree;
    }

    private async addExtensions(extensionCount: ExtensionCount, tree: GithubTree): Promise<void> {
        const data = tree.tree.reduce((acc, item: GithubTreeItem): { files: GithubTreeItem[], dirs: GithubTreeItem []} => {
            if (item.type === 'blob') {
                acc.files.push(item);
            }

            if (item.type === 'tree') {
                acc.dirs.push(item);
            }

            return acc;
        }, { files: [] as GithubTreeItem[], dirs: [] as GithubTreeItem[] });

        for (const file of data.files) {
            extensionCount.add(file.path);
        }

        await Promise.all(data.dirs.map(async (dir) => {
            const subTree = await this.getTreeByURL(dir.url);
            await this.addExtensions(extensionCount, subTree);
        }));
    }

}
