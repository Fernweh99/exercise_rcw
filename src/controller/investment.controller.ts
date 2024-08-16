import { Op, WhereOptions } from "sequelize";
import { modelsConn } from "../database"
import { Request, Response, NextFunction } from "express";
import { getPagination } from "../utils/pagination";

const models = modelsConn.getModels()

export class InvestmentController {
    public static async getInvestments(req: Request, res: Response, next: NextFunction) {
        try {
            const {limit, offset} = getPagination(req.query);
            const whereAndConditions: WhereOptions = [];
            
            if (req.query.hasOwnProperty('date_from')) {
                whereAndConditions.push({ confirmed_at: {
                    [Op.gte]: req.query.date_from
                }});
            }
            if (req.query.hasOwnProperty('date_from')) {
                whereAndConditions.push({ confirmed_at: {
                    [Op.gte]: req.query.date_from
                }});
            }
            const investments = await models.Investment.findAndCountAll({
                where: {
                    [Op.and]: whereAndConditions,
                },
                limit,
                offset,
            });

            return res.status(200).json(investments);
        } catch (error) {
            next(error);
        }
    }

    public static async createInvestment(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            const newInvestment = await models.Investment.create(body);

            return res.status(201).json(newInvestment);
        } catch (error) {
            next(error);
        }
    }
}