import app from "../server";
import supertest from "supertest";

describe("tests for the routes of the app.",()=>{
    beforeEach(():void => {
        console.log('\n_____________________________________\n');
    });

    beforeAll(():void => {
        console.log('\n*************************************\n');
    });

    afterAll(():void => {
        console.log('\n*************************************\n');
    });

    const request = supertest(app);
    
    it('expects status 200 from /', async ():Promise<void> => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });

    it('expects status 200 from /products', async ():Promise<void> => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });

    it('expects status 200 from /products/1', async ():Promise<void> => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
    });

    it('expects status 401 from /products', async ():Promise<void> => {
        const response = await request.post('/products');
        expect(response.status).toBe(401);
    });
    
    it('expects status 401 from /users', async ():Promise<void> => {
        const response = await request.get('/users');
        expect(response.status).toBe(401);
    });

    it('expects status 401 from /users', async ():Promise<void> => {
        const response = await request.post('/users');
        expect(response.status).toBe(200);
    });

    it('expects status 401 from /users/1', async ():Promise<void> => {
        const response = await request.get('/users/1');
        expect(response.status).toBe(401);
    });

    it('expects status 401 from /orders/myorder', async ():Promise<void> => {
        const response = await request.get('/orders/myorder');
        expect(response.status).toBe(401);
    });
})