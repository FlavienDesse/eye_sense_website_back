const connectMongoose= require('../../../connectToDb')
const app = require("../../../../app");
const supertest = require("supertest");
const request = supertest(app)

describe('Test get all categories',  () => {


    beforeAll(async () => {
        await connectMongoose()
    });

    it('get categories',  async (done) => {
        const response = await request.get('/api/categories/getAllCategories')

        expect(response.status).toBe(200)

        done()
    });




})