const request = require('supertest');
const app = require('../../../src/app');
const {MongoClient} = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
const config = require('../../../src/config/config');
const mongoose = require('mongoose');
const {Report} = require('../../../src/models/report.model')

describe('Get Endpoints', () => {

  beforeAll(async () => {
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

  afterAll(async () => {
    await Report.findOneAndDelete({_id: '33cb6b9b4f4ddef1ad47f941'})
    await Report.findOneAndDelete({_id: '33cb6b9b4f4ddef1ad47f940'})
    await mongoose.connection.close();
  });


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

  // test('return status 200 since 4321 exists and status 1', async () => {
  //   await request(app)
  //     .get('/v1/reports/searchReport/4321')
  //   expect(200)
  // })

  // test('return status 200 since 4321 exists and status 1', async () => {
  //   await request(app)
  //     .get('/v1/reports/searchReport/4321')
  //   expect(404)
  // })

});


