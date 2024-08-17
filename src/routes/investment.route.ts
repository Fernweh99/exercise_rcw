import { Router } from "express";
import { Route } from "../interfaces/server.interface";
import { InvestmentController } from "../controllers/investment.controller";
import { basicAuthorization } from "../middlewares/basicAuthorization.middleware";
import { tokenAuthorization } from "../middlewares/tokenAuthorization.middleware";

export class InvestmentRoute implements Route {
    public path = '/investments';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, tokenAuthorization, InvestmentController.getInvestments);
        this.router.get(`${this.path}/statistics`, tokenAuthorization, InvestmentController.getInvestmentsStatistics);
        this.router.post(`${this.path}`, tokenAuthorization, basicAuthorization, InvestmentController.createInvestment);
    }
}