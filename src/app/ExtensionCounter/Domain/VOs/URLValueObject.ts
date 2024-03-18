import { InvalidURL } from '../../../Shared/Domain/Exceptions/InvalidURL';

export class URLValueObject {

    private _value: string;

    constructor(url: string) {
        if (!this.isValidURL(url)) {
            throw new InvalidURL(url);
        }

        this._value = url;
    }

    public get value(): string {
        return this._value;
    }

    public equals(url: URLValueObject): boolean {
        return this.value === url.value;
    }

    private isValidURL(url: string): boolean {
        let validURL;

        try {
            validURL = new URL(url);
        } catch (_) {
            return false;
        }

        return validURL.protocol === 'http:' || validURL.protocol === 'https:';
    }

}
