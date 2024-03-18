import express, { Application, Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { GetExtensionCountController } from '../Controllers/GetExtensionCountController';

export class ExtensionCounterRoutes {

    constructor(private app: Application, private readonly basePath: string) {}

    public init(): void {
        const router: Router = express.Router();

        router.get(
            '/',
            asyncHandler((req: Request, res: Response) => new GetExtensionCountController().run(req, res)),
        );

        this.app.use(this.basePath, router);
    }

}
