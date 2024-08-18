import { NextFunction, Request, Response } from "express";
import { PASSWORD, USERNAME } from "../config";
import { HttpError } from "../utils/HttpError";

export const basicAuthorization = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) throw new HttpError(401, 'missing authorization header');

        const base64Credentials = authHeader.split(' ')[1];
        if (!base64Credentials) throw new HttpError(401, 'invalid authorization format');

        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        if (username != USERNAME || password != PASSWORD) throw new HttpError(401, 'invalid username or password');

        next()
    } catch (error) {
        next(error);
    }
}