import { Router } from "express";
import { Route } from "../interfaces/server.interface";
import { AuthorizationController } from "../controllers/authorization.controller";

export class AuthorizationRoute implements Route {
    public path = '/authorization';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, AuthorizationController.getToken);
    }
}