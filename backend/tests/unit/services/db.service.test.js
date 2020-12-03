const {MongoClient} = require('mongodb');
const app = require('../../../src/app');
const request = require('supertest');


describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('reports');

    const mockUser = {_id: 'some-user-id', video_url: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });

});

// it('report shoud be updated in db', async done => {
// const res = await request.post('/v1/reports/addReport')
// .send({
//     name: 'Sample Data Report',
//     video_url: 'https://video_url.com'
//   })

// var report = await Report.findOne({ name: 'Sample Data Report' })
// const reportId = report.id
// const res = await request.post('/v1/reports/updateReport/reportId')
// .send({
//     data: [20,70,50],
//     labels: ["x","y","z"],
//     status: 1
//   })

// report = await Report.findOne({ status: 1 })

// done()
// });

// let {addReport} = require('../../../src/services/db.service')

// let {Report} = require('../../../src/models/report.model')

// // jest.mock('../../../src/models/report.model', () => {
// //     return {
// //         Report: jest.fn().mockReturnValue({
// //             save: jest.fn().mockResolvedValue({
// //                 _id: 5
// //             })
// //         })
// //     }
// // })
// // const s = jest.fn()
// // expect(s).tohaveBeenCalledTimes(1)
// jest.mock('../../../src/models/report.model')
// // Report.mockReturnValue({
// //     save: jest.fn().mockResolvedValue({
// //         _id: 5
// //     })
// // })
// describe("when addReport iscalled", () =>  {
//     beforeEach(() => {
//         addReport(params)
//     })
//     afterEach(() => {
//         Report.mockClear()
//     })
//     it("shpould call constructoir with the right name", () => {
//         expect(Report.mocks[0]).tohaveBeenCalledWith({name: params})
//     })
//     it("should call sace", () => {
//         expect(Report.mocks[0].save).tohaveBeenCalledTimes(1)
//     })
// })
