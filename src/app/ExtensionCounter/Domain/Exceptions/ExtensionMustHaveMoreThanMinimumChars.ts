import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { Extension } from '../VOs/Extension';

export class ExtensionMustHaveMoreThanMinimumChars extends BaseException {

    constructor(extension: string) {
        super(
            `Extension ${extension} must have more than ${Extension.MINIMUM_LENGTH} chars`,
            {
                extension,
                minimumLength: Extension.MINIMUM_LENGTH,
            },
        );
        Object.setPrototypeOf(this, ExtensionMustHaveMoreThanMinimumChars.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}
