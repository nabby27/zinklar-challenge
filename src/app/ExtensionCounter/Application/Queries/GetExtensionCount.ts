import { URLValueObject } from '../../Domain/VOs/URLValueObject';
import { PlatformRepository } from '../../Domain/Repositories/PlatformRepository';
import { ExtensionCount } from '../../Domain/VOs/ExtensionCount';

export class GetExtensionCount {

    constructor(private platformRepository: PlatformRepository) {}

    async run({ url }: { url: string }): Promise<ExtensionCount> {
        const urlVO = new URLValueObject(url);

        const tree = await this.platformRepository.getExtensionCount(urlVO);

        return tree;
    }

}
