import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { Extension } from '../VOs/Extension';

export class ExtensionHaveInvalidChars extends BaseException {

    constructor(extension: string) {
        super(
            `Extension "${extension}" have invalid characters`,
            {
                extension,
                invalidChars: Extension.InvalidChars,
            },
        );
        Object.setPrototypeOf(this, ExtensionHaveInvalidChars.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}
