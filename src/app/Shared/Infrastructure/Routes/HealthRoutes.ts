import express, { Application, Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { GetIsHealthyController } from '../Controllers/GetIsHealthyController';

export class HealthRoutes {

    constructor(private app: Application, private readonly basePath: string) {}

    public init(): void {
        const router: Router = express.Router();

        router.get(
            '/',
            asyncHandler((req: Request, res: Response) => new GetIsHealthyController().run(req, res)),
        );

        this.app.use(this.basePath, router);
    }

}
