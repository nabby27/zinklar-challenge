import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';

export class InvalidGitHubURL extends BaseException {

    constructor(url: string) {
        super(
            `Github url ${url} is invalid`,
            {
                url,
            },
        );
        Object.setPrototypeOf(this, InvalidGitHubURL.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}
