import dotenv from 'dotenv'; dotenv.config();
import { Express } from 'express';
import { AuthorizationRoute } from "../src/routes/authorization.route";
import { InvestmentRoute } from "../src/routes/investment.route";
import { ApiServer } from '../src/app';

let api: Express;
export async function getApi(): Promise<Express> {
    if (api) return api;
    const apiServer = new ApiServer();
    await apiServer.initialize([new InvestmentRoute, new AuthorizationRoute]);
    api = apiServer.getServer();
    return api;
}