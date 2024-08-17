import { Router } from "express";
import { Route } from "../interfaces/server.interface";
import { modelsConn } from "../database";
import { InvestmentController } from "../controllers/investment.controller";

const models = modelsConn.getModels()

export class InvestmentRoute implements Route {
    public path = '/investment';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, InvestmentController.getInvestments);
        this.router.get(`${this.path}/statistics`, InvestmentController.getInvestmentsStatistics);
        this.router.post(`${this.path}`, InvestmentController.createInvestment);
    }
}