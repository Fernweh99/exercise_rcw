import dotenv from 'dotenv'; dotenv.config();
import request from 'supertest';
import { Express } from 'express';
import { getApi } from './server-utils';

let api: Express;
beforeAll(async () => {
    api = await getApi();
});

describe('GET api/authorization', () => {
    it('should return 200 with api token', async () => {
        const res = await request(api)
            .get('/api/authorization')
            .send()
            .set('Accept', 'application/json');
        expect(res.statusCode).toEqual(200);
        expect(res.body.token).toBeTruthy();
    });
});
