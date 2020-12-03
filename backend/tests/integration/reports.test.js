const request = require('supertest');
const app = require('../../src/app.js');
const {MongoClient} = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
const config = require('../../src/config/config');
const mongoose = require('mongoose');
const {Report} = require('../../src/models/report.model')
const {dbService} = require('../../src/services')


describe('Test getReport Endpoint', () => {

  beforeEach(async () => {
    mongoose.connect(config.mongoose.url, config.mongoose.options);


    const one = new Report({
      _id: '33cb6b9b4f4ddef1ad47f940', video_url: 'www.s3site.com', status: 0
    })
    const two = new Report({
      _id: '33cb6b9b4f4ddef1ad47f941', video_url: 'www.s3site.com', status: 1
    })
    await one.save()
    await two.save()
  });

  afterEach(async () => {
    await Report.findOneAndDelete({_id: '33cb6b9b4f4ddef1ad47f941'})
    await Report.findOneAndDelete({_id: '33cb6b9b4f4ddef1ad47f940'})
    await mongoose.connection.close();
  });

  describe('Test add functiosn', () => {
    test('adding a report', async () => {

      var id = await dbService.addReport("fileName")
      var report = await Report.findById({_id: id})
      expect(report).not.toBeNull()
  })
  })

  describe('Test functiosn', () => {
    test('updating a report', async () => {
      await dbService.updateReport( '33cb6b9b4f4ddef1ad47f940', {
        labels:['5', '10', '15'], 
        data:[5,10,15], 
        status: "1"})

      var report = await Report.findById({_id: new ObjectID("33cb6b9b4f4ddef1ad47f940")}).lean()
      var json = {
        "__v": 0,
       "_id": "33cb6b9b4f4ddef1ad47f940",
        "data": [
          5,
          10,
          15,
        ],
        "labels": [
          "5",
          "10",
          "15",
        ],
       "status": "1"
      }
      expect(report.data).toEqual([5,10,15])
      expect(report.labels).toEqual(["5","10","15"])
      expect(report.status).toEqual("1")

  })
  })

  test('return status 206 since report exists and status 0', async () => {
    await request(app)
      .get('/v1/reports/searchReport/33cb6b9b4f4ddef1ad47f940')
    expect(206)
  })

  test('return status 200 since report exists and status 1', async () => {
    await request(app)
      .get('/v1/reports/searchReport/33cb6b9b4f4ddef1ad47f941')
    expect(200)
  })

  test('return status 404 since report does not exists', async () => {
    await request(app)
      .get('/v1/reports/searchReport/444b6b9b4f4ddef1ad47f941')
    expect(404)
  })

});

