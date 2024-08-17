import { Op, WhereOptions } from "sequelize";
import { modelsConn } from "../database"
import { Request, Response, NextFunction } from "express";
import { getPagination } from "../utils/pagination";
import moment from 'moment';

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

    public static async getInvestmentsStatistics(req: Request, res: Response, next: NextFunction) {
        try {
            const dateTo = moment(req.query.date_to as string).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD');
            const dateFrom = req.query.date_from;

            const days = await modelsConn.rawQuery(`
                select 
                    to_char(i.created_at, 'YYYY-MM-DD') as day,
                    ROUND(AVG(i.value), 2) as average_value,
                    CAST(count(1) AS INT) as investment_count
                from 
                    investments i
                where 
                    i.created_at::date <= '${dateTo}'
                    ${dateFrom ? `and i.created_at::date >= '${dateFrom}'` : ''}
                group by 
                    day
                order by 
                    day desc;
            `);

            const weeks = await modelsConn.rawQuery(`
                select 
                    to_char(date_trunc('week', i.created_at), 'YYYY-MM-DD') as week_start, 
                    to_char(date_trunc('week', i.created_at) + INTERVAL '6 days', 'YYYY-MM-DD') as week_end,
                    ROUND(AVG(i.value), 2) as average_value,
                    CAST(count(1) AS INT) as investment_count
                from 
                    investments i
                where 
                    i.created_at::date <= '${dateTo}'
                    ${dateFrom ? `and i.created_at::date >= '${dateFrom}'` : ''}
                group by 
                    week_start,
                    week_end
                order by 
                    week_start DESC;
            `);

            const months = await modelsConn.rawQuery(`
                select 
                    to_char(i.created_at, 'YYYY-MM') as month, 
                    ROUND(AVG(i.value), 2) as average_value,
                    CAST(count(1) AS INT) as investment_count
                    from 
                    investments i
                where 
                    i.created_at::date <= '${dateTo}'
                    ${dateFrom ? `and i.created_at::date >= '${dateFrom}'` : ''}
                group by 
                    month
                order by 
                    month desc;
            `);

            const years = await modelsConn.rawQuery(`
                select 
                    to_char(i.created_at, 'YYYY') as year, 
                    ROUND(AVG(i.value), 2) as average_value,
                    CAST(count(1) AS INT) as investment_count
                from 
                    investments i
                where 
                    i.created_at::date <= '${dateTo}'
                    ${dateFrom ? `and i.created_at::date >= '${dateFrom}'` : ''}
                group by 
                    year
                order by 
                    year desc;
            `);

            return res.status(200).json({days, weeks, months, years})
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