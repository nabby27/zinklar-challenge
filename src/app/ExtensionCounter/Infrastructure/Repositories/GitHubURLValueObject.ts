import { URLValueObject } from '../../Domain/VOs/URLValueObject';
import { InvalidGitHubURL } from '../../Domain/Exceptions/InvalidGitHubURL';

export class GitHubURLValueObject {

    private _value: string;
    private _owner: string;
    private _repo: string;

    constructor(url: string) {
        this.ensureIsValidURL(url);
        if (!this.isValidGitHubURL(url)) {
            throw new InvalidGitHubURL(url);
        }

        this._value = url;
        this._owner = url.split('/')[3];
        this._repo = url.split('/')[4];
    }

    public get value(): string {
        return this._value;
    }

    public get owner(): string {
        return this._owner;
    }

    public get repo(): string {
        return this._repo;
    }

    public equals(url: GitHubURLValueObject): boolean {
        return this.value === url.value;
    }

    private ensureIsValidURL(url: string): void {
        new URLValueObject(url);
    }

    private isValidGitHubURL(url: string): boolean {
        const validURL = new URL(url);

        return validURL.hostname === 'github.com';
    }

}
