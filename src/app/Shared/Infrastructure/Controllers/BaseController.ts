import { Request, Response } from 'express';

export abstract class BaseController {

    public abstract run(req: Request, res: Response): Promise<void>;

}

