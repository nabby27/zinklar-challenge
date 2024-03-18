import { BaseException } from './BaseException';

export class InvalidURL extends BaseException {

    constructor(url: string) {
        super(
            `Url "${url}" is invalid`,
            {
                url,
            },
        );
        Object.setPrototypeOf(this, InvalidURL.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}
