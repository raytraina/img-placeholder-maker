import request from 'supertest';
import { app } from '../index';
// import { response } from 'express';

// const request = supertest(app);
describe('Test routues and endpoints', () => {
    it('gets the root route', async () => {
        const response = await request(app).get('/');
        expect(200);
    })

    it('gets the /api route', async () => {
        const response = await request(app).get('/api');
        expect(response.text).toContain('Try going to a different URL');
    })

    it('gets the /api/images endpoint', async () => {
        const response = await request(app).get('/api/images');
        expect(response.text).toContain('no such file or directory');
    })

    it('gets the /api/images endpoint', async () => {
        const response = await request(app).get('/api/images?filename=a&width=2&height=3');
        expect(response.text).toContain('no such file or directory');
    })

    it('gets the /api/images/upload endpoint', async () => {
        const response = await request(app).get('/api/images/upload');
        expect(response.text).toContain('Cannot GET /api/images/upload');
    })
});