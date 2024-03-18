import { ExtensionHaveInvalidChars } from '../Exceptions/ExtensionHaveInvalidChars';
import { ExtensionMustHaveLessThanMaximumChars } from '../Exceptions/ExtensionMustHaveLessThanMaximumChars';
import { ExtensionMustHaveMoreThanMinimumChars } from '../Exceptions/ExtensionMustHaveMoreThanMinimumChars';

export class Extension {

    private _value: string;

    public static readonly InvalidChars = [
        '<',
        '>',
        '\\',
        '/',
        '|',
        '*',
        '[',
        ']',
        '^',
        '$',
        '#',
        '&',
        '{',
        '}',
    ];

    public static readonly MINIMUM_LENGTH = 1;
    public static readonly MAXIMUM_LENGTH = 20;

    private constructor(_value: string) {
        if (_value.length < Extension.MINIMUM_LENGTH) {
            throw new ExtensionMustHaveMoreThanMinimumChars(_value);
        }

        if (_value.length > Extension.MAXIMUM_LENGTH) {
            throw new ExtensionMustHaveLessThanMaximumChars(_value);
        }

        const haveInvalidChars = Extension.InvalidChars.some(invalidChar => _value.includes(invalidChar));

        if (haveInvalidChars) {
            throw new ExtensionHaveInvalidChars(_value);
        }

        this._value = _value;
    }

    public get value(): string {
        return this._value;
    }

    public static fromFile(file: string): Extension {
        const parts = file.split('.');
        const extension = parts[parts.length - 1];

        return new Extension(extension);
    }

}
