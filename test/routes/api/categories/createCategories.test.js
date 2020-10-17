const connectMongoose = require('../../../connectToDb')
const app = require("../../../../app");
const supertest = require("supertest");
const request = supertest(app)
const Categories = require('../../../../models/Category')
const Photos = require('../../../../models/Photos')

const validCategories = require('../../../data/category/validCategories')
const withoutImg = validCategories.withoutImg
const withOneImg = validCategories.withOneImg

/*
 nameCategory : nameCategory,
                    allImg: allImg,
 */


describe('Create categories', () => {


    beforeAll(async () => {
        await connectMongoose()

        const validUser = new Categories(withoutImg);
        await validUser.save()

    });


    test('Should return 402 cause category already exist', async (done) => {
        const response = await request.post('/api/categories/createCategories').send({nameCategory: 'test1'})


        expect(response.status).toBe(402)
        expect(response.body.message.message).toBe("Category name already exist")

        done()
    });

    test('Should return 402 cause no name provided', async (done) => {
        const response = await request.post('/api/categories/createCategories').send({nameCategory: ''})

        expect(response.status).toBe(402)
        expect(response.body.message.message).toBe("Error please precise the name of the category")

        done()
    });

    test('Should return 400 and create photos in database', async (done) => {
        const response = await request.post('/api/categories/createCategories').send({nameCategory:'test1',allImg:[{name:"prout",extension:"jpg"}]})

        expect(response.status).toBe(400)
        expect(response.body.message.message).toBe("Error please precise the name of the category")

        done()
    });


})