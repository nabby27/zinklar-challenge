import { URLValueObject } from '../VOs/URLValueObject';
import { ExtensionCount } from '../VOs/ExtensionCount';

export interface PlatformRepository {
    getExtensionCount(repository: URLValueObject): Promise<ExtensionCount>;
}
