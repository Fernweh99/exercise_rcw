import { Request, Response, NextFunction } from "express";
import { tokenList } from "../middlewares/tokenAuthorization.middleware";

export class AuthorizationController {
    public static getToken(req: Request, res: Response, next: NextFunction) {
        const token = Date.now();

        tokenList[token] = true;

        return res.status(200).json({ token });
    }
}