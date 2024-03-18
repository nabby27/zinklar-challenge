import { faker } from '@faker-js/faker';
import { GithubTree } from '../../../../app/ExtensionCounter/Infrastructure/Repositories/GithubTree';
import { getRandomInt } from '../../../Shared/util';

export class GithubTreeMother {

    public static files({ count, ext }: {count?: number, ext: string}): GithubTree {
        count = count || getRandomInt({ max: 3 });

        return {
            sha: faker.git.commitSha(),
            url: faker.internet.url(),
            tree: [...Array(getRandomInt({ min: count, max: count })).keys()].map(() => ({
                path: `${faker.system.filePath()}.${ext}`,
                mode: `${faker.number.int(200000)}`,
                type: 'blob',
                sha: faker.git.commitSha(),
                url: faker.internet.url(),
            })),
        };
    }

    public static trees({ count }:{count?: number} = {}): GithubTree {
        count = count || getRandomInt({ max: 3 });

        return {
            sha: faker.git.commitSha(),
            url: faker.internet.url(),
            tree: [...Array(getRandomInt({ min: count, max: count })).keys()].map(() => ({
                path: faker.system.filePath(),
                mode: `${faker.number.int(200000)}`,
                type: 'tree',
                sha: faker.git.commitSha(),
                url: faker.internet.url(),
            })),
        };
    }

}
