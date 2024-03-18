import { ExtensionCount } from '../../../../app/ExtensionCounter/Domain/VOs/ExtensionCount';
import { faker } from '@faker-js/faker';
import { getRandomInt } from '../../../Shared/util';

export class ExtensionCountMother {

    public static random(): ExtensionCount {
        const randomNumberOfExtensions = getRandomInt();

        const extensionCount = ExtensionCount.create();

        [...Array(randomNumberOfExtensions).keys()].forEach(() => {
            const ext = faker.system.commonFileExt();
            extensionCount.add(ext);
        });

        return extensionCount;
    }

    public static with(data: {count: number, ext: string}[]): ExtensionCount {
        const extensionCount = ExtensionCount.create();

        data.forEach(({ count, ext }) => {
            [...Array(count).keys()].forEach(() => {
                extensionCount.add(ext);
            });
        });

        return extensionCount;
    }

}
