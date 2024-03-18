import { GithubTreeMother } from '../Mothers/GithubTreeMother';
import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import 'vitest-fetch-mock';
import { GithubRepository } from '../../../../app/ExtensionCounter/Infrastructure/Repositories/GithubRepository';
import { URLValueObject } from '../../../../app/ExtensionCounter/Domain/VOs/URLValueObject';
import { ExtensionCountMother } from '../../../unit/ExtensionCounter/Domain/ExtensionCountMother';
import { InvalidGitHubURL } from '../../../../app/ExtensionCounter/Domain/Exceptions/InvalidGitHubURL';
import { expectToThrow } from '../../../Shared/ActionChecker';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('GithubRepository', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    describe('getExtensionCount', () => {
        it(`
            GIVEN a invalid github url
            WHEN call to get the extension count
            THEN throw InvalidGitHubURL exception
        `, async () => {
            const url = new URLValueObject('http://example.com');

            const githubRepository = new GithubRepository();

            await expectToThrow(githubRepository.getExtensionCount(url), InvalidGitHubURL);
        });

        it(`
            GIVEN a valid github url
            WHEN call to get the extension count
            THEN receive the extension count
        `, async () => {
            const url = new URLValueObject('https://github.com/nabby27/main-fns');

            const extensionCounter = ExtensionCountMother.with([{ count: 2, ext: 'js' }]);

            const githubFiles = GithubTreeMother.files({ count: 2, ext: 'js' });
            fetchMock.mockResponse(JSON.stringify(githubFiles));

            const githubRepository = new GithubRepository();
            const result = await githubRepository.getExtensionCount(url);

            expect(result).toEqual(extensionCounter);
        });

        it(`
            GIVEN a valid github url
            WHEN call to get the extension count with tree
            THEN receive the extension count
        `, async () => {
            const url = new URLValueObject('https://github.com/nabby27/main-fns');

            const extensionCounter = ExtensionCountMother.with([{ count: 2, ext: 'js' }, { count: 3, ext: 'ts' }]);

            const githubTree = GithubTreeMother.trees({ count: 2 });
            const githubFilesJs = GithubTreeMother.files({ count: 2, ext: 'js' });
            const githubFilesTs = GithubTreeMother.files({ count: 3, ext: 'ts' });
            fetchMock.mockResponseOnce(JSON.stringify(githubTree));
            fetchMock.mockResponseOnce(JSON.stringify(githubFilesJs));
            fetchMock.mockResponseOnce(JSON.stringify(githubFilesTs));

            const githubRepository = new GithubRepository();
            const result = await githubRepository.getExtensionCount(url);

            expect(result).toEqual(extensionCounter);
        });
    });
});
