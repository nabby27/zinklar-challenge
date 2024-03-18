import { Request, Response } from 'express';
import { BaseController } from '../../../Shared/Infrastructure/Controllers/BaseController';
import { HTTP_CODES } from '../../../constants';
import { GetExtensionCount } from '../../Application/Queries/GetExtensionCount';
import { GithubRepository } from '../Repositories/GithubRepository';
import { PlatformRepository } from '../../Domain/Repositories/PlatformRepository';

export class GetExtensionCountController extends BaseController {

    private getExtensionCount: GetExtensionCount;

    constructor() {
        super();
        const platformRepository: PlatformRepository = new GithubRepository();

        this.getExtensionCount = new GetExtensionCount(platformRepository);
    }

    async run(
        req: Request,
        res: Response,
    ): Promise<void> {
        const { url } = await this.getParams(req);

        const extensionCount = await this.getExtensionCount.run({ url });

        res.status(HTTP_CODES.SUCCESS).send(extensionCount.values);
    }

    private async getParams(req: Request) {
        const query = req.query;

        return {
            url: query.url as string,
        };
    }

}
