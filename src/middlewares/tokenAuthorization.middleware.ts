import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/HttpError";

export const tokenList: {}[] = [];

export const tokenAuthorization = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['api-token'];

        if (!token) throw new HttpError(401, 'missing authorization token');
        if (typeof token != 'string') throw new HttpError(401, 'invalid format for token');
        if (!tokenList[token]) throw new HttpError(401, 'token invalid or already used')

        delete tokenList[token];

        next();
    } catch (error) {
        next(error);
    }
}