import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import morgan from 'morgan';
import { LOG_FORMAT, NODE_ENV, PORT } from './config';
import { Route } from './interfaces/server.interface';

class ApiServer {
    private app: express.Application;
    private env: string;
    private port: string | number;
    private initialized = false;

    constructor() {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3000;
    }

    public async initialize(routes: Route[]) {
        await this.connectDatabase(),
        this.initializeMiddlewares(),
        this.initializeRoutes(routes),
        this.initializeErrorHandling(),

        this.initialized = true;
    }

    private async connectDatabase() {
        // connect to database
    }

    private initializeMiddlewares() {
        this.app.use(morgan(LOG_FORMAT || 'dev'));
        this.app.use(cors());
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    
    private initializeRoutes(routes: Route[]) {
        // initialize auth and unauth routes
    }

    private initializeErrorHandling() {
        // create middleware for manage error
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.info(`=================================`);
            console.info(`======= ENV: ${this.env} =======`);
            console.info(`App listening on the port ${this.port}`);
        });
    }

    public getServer() {
        return this.app;
    }
}