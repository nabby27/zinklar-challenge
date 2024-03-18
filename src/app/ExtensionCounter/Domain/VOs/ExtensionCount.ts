import { Extension } from './Extension';

export class ExtensionCount {

    private _values: Record<string, number> = {};

    private constructor() {
    }

    get values(): Record<string, number> {
        return this._values;
    }

    public static create(): ExtensionCount {
        return new ExtensionCount();
    }

    public add(file: string): void {
        const ext = Extension.fromFile(file).value;

        if (this._values[ext]) {
            this._values[ext]++;
        } else {
            this._values[ext] = 1;
        }
    }

}
