import dotenv from 'dotenv'; dotenv.config();
import request from 'supertest';
import { Express } from 'express';
import {faker} from '@faker-js/faker';
import { getApi } from './server-utils';
import { Investment } from '../src/database/models/investments.model';
import { PASSWORD, USERNAME } from '../src/config';

let api: Express, token: any;
const basicAuthInBase64 = Buffer.from(`${USERNAME}:${PASSWORD}`, 'ascii').toString('base64');

beforeAll(async () => {
    api = await getApi();
});

describe('GET api/investments', () => {
    it('should return 401 for missing authorization token', async () => {
        const res = await request(api)
            .get('/api/investments')
            .send()
            .set('Accept', 'application/json');
        expect(res.statusCode).toEqual(401);
        expect(res.body.detail).toEqual('missing authorization token');
    });

    it('should return 200 with investments', async () => {
        const resToken = await request(api)
            .get('/api/authorization')
            .send()
            .set('Accept', 'application/json');
        expect(resToken.statusCode).toEqual(200);

        token = resToken.body.token;

        const res = await request(api)
            .get('/api/investments')
            .send()
            .set('Accept', 'application/json')
            .set('api-token', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body.count).toBeGreaterThan(0);

        const investment: Investment = res.body.rows[0];
        expect(investment.annual_rate).toBeDefined();
        expect(investment.confirm_at).toBeDefined();
        expect(investment.value).toBeDefined();
        expect(investment.id).toBeDefined();
        expect(investment.created_at).toBeDefined();
        expect(investment.updated_at).toBeDefined();
    });

    it('should return 401 for token already used', async () => {
        const res = await request(api)
            .get('/api/investments')
            .send()
            .set('Accept', 'application/json')
            .set('api-token', token);
        expect(res.statusCode).toEqual(401);
        expect(res.body.detail).toEqual('token invalid or already used');
    });
});
describe('GET api/investments/statistics', () => {
    it('should return 401 for missing authorization token', async () => {
        const res = await request(api)
            .get('/api/investments/statistics')
            .send()
            .set('Accept', 'application/json');
        expect(res.statusCode).toEqual(401);
        expect(res.body.detail).toEqual('missing authorization token');
    });

    it('should return 200 with investments statistics', async () => {
        const resToken = await request(api)
            .get('/api/authorization')
            .send()
            .set('Accept', 'application/json');
        expect(resToken.statusCode).toEqual(200);

        token = resToken.body.token;

        const res = await request(api)
            .get('/api/investments/statistics')
            .send()
            .set('Accept', 'application/json')
            .set('api-token', token);
        expect(res.statusCode).toEqual(200);

        const years = res.body.years[0];
        const days = res.body.days[0];
        const weeks = res.body.weeks[0];
        const months = res.body.months[0];

        expect(years.average_value).toBeDefined()
        expect(years.investment_count).toBeDefined()
        expect(years.year).toBeDefined()

        expect(days.average_value).toBeDefined()
        expect(days.investment_count).toBeDefined()
        expect(days.day).toBeDefined()
        

        expect(weeks.average_value).toBeDefined()
        expect(weeks.investment_count).toBeDefined()
        expect(weeks.week_end).toBeDefined()
        expect(weeks.week_start).toBeDefined()

        expect(months.average_value).toBeDefined()
        expect(months.investment_count).toBeDefined()
        expect(months.month).toBeDefined()

    });

    it('should return 401 for token already used', async () => {
        const res = await request(api)
            .get('/api/investments/statistics')
            .send()
            .set('Accept', 'application/json')
            .set('api-token', token);
        expect(res.statusCode).toEqual(401);
        expect(res.body.detail).toEqual('token invalid or already used');
    });
});

describe('POST api/investments', () => {
    it('should return 401 for missing authorization token', async () => {
        const res = await request(api)
            .post('/api/investments')
            .send()
            .set('Accept', 'application/json');
        expect(res.statusCode).toEqual(401);
        expect(res.body.detail).toEqual('missing authorization token');
    });

    it('should return 401 for missing authorization header', async () => {
        const resToken = await request(api)
            .get('/api/authorization')
            .send()
            .set('Accept', 'application/json');
        expect(resToken.statusCode).toEqual(200);

        token = resToken.body.token;

        const res = await request(api)
            .post('/api/investments')
            .send()
            .set('Accept', 'application/json')
            .set('api-token', token);
        expect(res.statusCode).toEqual(401);
        expect(res.body.detail).toEqual('missing authorization header');
    });

    it('should return 401 for invalid authorization format', async () => {
        const resToken = await request(api)
            .get('/api/authorization')
            .send()
            .set('Accept', 'application/json');
        expect(resToken.statusCode).toEqual(200);

        token = resToken.body.token;

        const res = await request(api)
            .post('/api/investments')
            .send()
            .set('Accept', 'application/json')
            .set('api-token', token)
            .set('authorization', 'basic');
        expect(res.statusCode).toEqual(401);
        expect(res.body.detail).toEqual('invalid authorization format');
    });

    it('should return 401 for invalid authorization format', async () => {
        const resToken = await request(api)
            .get('/api/authorization')
            .send()
            .set('Accept', 'application/json');
        expect(resToken.statusCode).toEqual(200);

        token = resToken.body.token;

        const value = faker.number.int({min:1, max:100000})
        const annual_rate = faker.number.float({fractionDigits: 2, min: 0, max: 100});
        const confirm_at = faker.date.recent();

        const res = await request(api)
            .post('/api/investments')
            .set('Accept', 'application/json')
            .set('api-token', token)
            .set('authorization', 'basic ' + basicAuthInBase64)
            .send({value, annual_rate, confirm_at});
        expect(res.statusCode).toEqual(201);

        expect(res.body.confirm_at).toEqual(confirm_at.toISOString());
        expect(parseFloat(res.body.annual_rate)).toEqual(annual_rate);
        expect(res.body.value).toEqual(value);
    });

    it('should return 401 for token already used', async () => {
        const res = await request(api)
            .post('/api/investments')
            .send()
            .set('Accept', 'application/json')
            .set('api-token', token);
        expect(res.statusCode).toEqual(401);
        expect(res.body.detail).toEqual('token invalid or already used');
    });
});


