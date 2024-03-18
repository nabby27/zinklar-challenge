import express, { Express, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import { exceptionHandler } from './exceptionHandler';
import cors from 'cors';
import { env_origins } from './constants';
import { HealthRoutes } from './Shared/Infrastructure/Routes/HealthRoutes';
import { ExtensionCounterRoutes } from './ExtensionCounter/Infrastructure/Routes/ExtensionCounterRoutes';

export class App {

    private app: Express;
    private server: Server | null = null;
    private isReady: boolean = false;

    constructor() {
        this.app = express();
    }

    public async init(): Promise<void> {
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.exceptionHandler();
        this.isReady = true;
    }

    public async startServer(): Promise<void> {
        if (!this.isReady) {
            await this.init();
        }

        this.server = this.app.listen(process.env.API_PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Example app listening at http://localhost:${process.env.API_PORT}`); // TODO: change to env
        });
    }

    public stopServer(): void {
        this.server?.close();
    }

    private initializeMiddlewares(): void {
        this.app.use(cors({
            origin: env_origins[process.env.ENV as ('prod' | 'dev' | 'test') || 'test'],
        }));
    }

    private initializeRoutes() {
        new HealthRoutes(this.app, '/health').init();
        new ExtensionCounterRoutes(this.app, '/count').init();
    }

    private exceptionHandler(): void {
        this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            exceptionHandler(error, res);
            next();
        });
    }

}
