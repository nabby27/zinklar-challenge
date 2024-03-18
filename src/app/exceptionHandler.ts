import { Response } from 'express';
import { BaseException } from './Shared/Domain/Exceptions/BaseException';
import { InvalidURL } from './Shared/Domain/Exceptions/InvalidURL';
import { HTTP_CODES } from './constants';
import { ExtensionHaveInvalidChars } from './ExtensionCounter/Domain/Exceptions/ExtensionHaveInvalidChars';
import { ExtensionMustHaveLessThanMaximumChars } from './ExtensionCounter/Domain/Exceptions/ExtensionMustHaveLessThanMaximumChars';
import { ExtensionMustHaveMoreThanMinimumChars } from './ExtensionCounter/Domain/Exceptions/ExtensionMustHaveMoreThanMinimumChars';
import { InvalidGitHubURL } from './ExtensionCounter/Domain/Exceptions/InvalidGitHubURL';

export const exceptionHandler = (error: Error, res: Response): void => {
    if (error instanceof BaseException) {
        const httpCode = mapErrors(error);

        res.status(httpCode).json({
            error: error.message,
            errorType: error.constructor.name,
            data: error.data,
        });
    } else {
        res.status(HTTP_CODES.SERVER_ERROR).json({
            error: 'Unknown error',
            name: error.name,
            message: error.message,
            stack: error.stack,
        });
    }
};

function mapErrors(error: BaseException): number {
    switch (error.constructor.name) {
        case InvalidURL.name:
        case InvalidGitHubURL.name:
        case ExtensionHaveInvalidChars.name:
        case ExtensionMustHaveLessThanMaximumChars.name:
        case ExtensionMustHaveMoreThanMinimumChars.name:
            return 400;
        default:
            return 500;
    }
}
