import { config } from 'dotenv';
config({path: '.env'});

export const {
    NODE_ENV,
    PORT,
    LOG_FORMAT,
    DATABASE_URL,
    USERNAME,
    PASSWORD,
} = process.env