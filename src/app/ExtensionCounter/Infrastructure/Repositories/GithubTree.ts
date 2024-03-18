export interface GithubTree {
    sha: string;
    url: string;
    tree: GithubTreeItem[];
}

export interface GithubTreeItem {
    path: string,
    mode: string,
    type: 'blob' | 'tree' | 'commit',
    size?: number,
    sha: string,
    url: string
}
