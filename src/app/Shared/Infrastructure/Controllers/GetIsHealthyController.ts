import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { exceptionHandler } from '../../../exceptionHandler';
import { HTTP_CODES } from '../../../constants';

export class GetIsHealthyController extends BaseController {

    constructor() {
        super();
    }

    async run(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            res.status(HTTP_CODES.SUCCESS).send({ message: 'I am healthy!' });
        } catch (error) {
            exceptionHandler(error as Error, res);

            console.error(`Request: ${this.constructor.name}`, error);
        }
    }

}
