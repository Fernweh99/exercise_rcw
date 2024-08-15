import { config } from 'dotenv';
config({path: '.env'});

export const {
    NODE_ENV,
    PORT,
    LOG_FORMAT,
} = process.env