const request = require('supertest');
const express = require('express');
const router = require('../../routes/householdRoutes')

const app = new express();
app.use('/', router);

describe('Household routes', function (){
    test('responds to /getall', async () => {
        const res = await request(app).get('/getall');
        expect(res.header['content-type']).toBe('application/json');
        expect(res.statusCode).toBe(200)
    })
})

describe("POST /createhousehold", () => {
    test("should create a new household", async () => {
        return request(app)
            .post("/createhousehold")
            .expect(200)
            .then(({body})=>{
                
            })
    })
})

// https://medium.com/@it.ermias.asmare/node-js-express-with-jest-and-supertest-e58aaf4c4514