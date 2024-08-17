import { NextFunction, Request, Response } from "express";
import { PASSWORD, USERNAME } from "../config";

export const basicAuthorization = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).send('missing authorization header');

        const base64Credentials = authHeader.split(' ')[1];
        if (!base64Credentials) return res.status(401).send('invalid authorization format');

        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        if (username != USERNAME || password != PASSWORD) return res.status(401).send('invalid username or password');

        next()
    } catch (error) {
        next(error);
    }
}