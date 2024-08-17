import { NextFunction, Request, Response } from "express";

export const tokenList: {}[] = [];

export const tokenAuthorization = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['api-token'];

        if (!token) return res.status(401).send('missing authorization token');
        if (typeof token != 'string') return res.status(404).send('invalid format for token');
        if (!tokenList[token]) return res.status(401).send('token invalid or already used')

        delete tokenList[token];

        next();
    } catch (error) {
        next(error);
    }
}