import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { Extension } from '../VOs/Extension';

export class ExtensionMustHaveLessThanMaximumChars extends BaseException {

    constructor(extension: string) {
        super(
            `Extension ${extension} must have less than ${Extension.MAXIMUM_LENGTH} chars`,
            {
                extension,
                maximumLength: Extension.MAXIMUM_LENGTH,
            },
        );
        Object.setPrototypeOf(this, ExtensionMustHaveLessThanMaximumChars.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}
