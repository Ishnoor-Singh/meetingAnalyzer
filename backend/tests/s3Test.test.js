const { default: expectCt } = require('helmet/dist/middlewares/expect-ct')
const request = require('supertest')
const app = require('../src/app')
const fs = require('fs')
const {addReport} = require('../src/services/db.service')


jest.mock('../src/services/db.service.js')
// const myMockedModule = jest.mock
// jest.mock('../src/services/db.service.js', () =>{
//     return {
//         addReport: jest.fn().mockResolvedValue('id555')
//     }
// })


describe('End to end test for the s3 routes', () => {
    describe('Testing the /saveFile endpoint', () => {
        let res;

        it('Should return with code 201 if called with correct data', async() => {
            addReport.mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    resolve('id555')
                })
            })
            res = await request(app)
                .post('/v1/s3/saveFile')
                .attach('file', 'tests/fixtures/file.txt').expect(201)
            expect(res.status).toBe(201)
            expect(res.text).toBe("{\"msg\":{\"id\":\"id555\"}}")
        })

        it('Should reutrn with code 500 if called with no files', async () => {
            addReport.mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    resolve('reolved by mock')
                })
            })
            res = await request(app)
                .post('/v1/s3/saveFile')
                .expect(500)
            expect(res.status).toBe(500)
        })

        it('Should reutrn with code 500 if addFiles fails', async () => {
            addReport.mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    reject('rejected by mock')
                })
            })
            res = await request(app)
                .post('/v1/s3/saveFile')
                .attach('file', 'tests/fixtures/file.txt').expect(500)
            expect(res.status).toBe(500)
        })
    })
})