import { anything, when } from 'ts-mockito';
import { PlatformRepository } from '../../../../app/ExtensionCounter/Domain/Repositories/PlatformRepository';
import { RepositoryMock } from '../../Shared/Infrastructure/RepositoryMock';
import { GetExtensionCount } from '../../../../app/ExtensionCounter/Application/Queries/GetExtensionCount';
import { ExtensionCountMother } from '../Domain/ExtensionCountMother';
import { expectToThrow } from '../../../Shared/ActionChecker';
import { InvalidURL } from '../../../../app/Shared/Domain/Exceptions/InvalidURL';
import { InvalidGitHubURL } from '../../../../app/ExtensionCounter/Domain/Exceptions/InvalidGitHubURL';

describe('GetExtensionCount', () => {
    const platformRepositoryMock = new RepositoryMock<PlatformRepository>();

    afterEach(() => {
        platformRepositoryMock.reset();
    });

    test(`
        GIVEN a valid url
        WHEN call to get the extension count
        THEN receive the extension count
    `, async () => {
        const url = 'http://example.com';

        const extensionCount = ExtensionCountMother.random();

        when(platformRepositoryMock.mockito.getExtensionCount(anything())).thenResolve(extensionCount);

        const action = new GetExtensionCount(platformRepositoryMock.instance());
        const result = await action.run({ url });

        expect(result).toEqual(extensionCount);
    });

    test(`
        GIVEN a invalid url
        WHEN call to get the extension count
        THEN throw InvalidURL exception
    `, async () => {
        const url = 'example';

        const action = new GetExtensionCount(platformRepositoryMock.instance());

        await expectToThrow(action.run({ url }), InvalidURL);
    });

    test(`
        GIVEN a valid url
        WHEN call to get the extension count
        AND the infrastructure fails
        THEN propagate the exception
    `, async () => {
        const url = 'https://example.com';

        when(platformRepositoryMock.mockito.getExtensionCount(anything())).thenThrow(new InvalidGitHubURL(url));

        const action = new GetExtensionCount(platformRepositoryMock.instance());

        await expectToThrow(action.run({ url }), InvalidGitHubURL);
    });
});
