import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/HttpError';

const errorMiddleware = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number = error.status || 500;
        const message: string = error.message || 'Something went wrong';

        res.status(status).json({ status: status, detail: message });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;
