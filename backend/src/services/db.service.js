
require('dotenv').config()
const {Report} = require('../models/report.model')
var ObjectID = require('mongodb').ObjectID;

const addReport = async (fileName) => {
  const report = new Report({
                          name: fileName,
                          video_name: `https://elasticbeanstalk-us-west-1-516879159697.s3-us-west-1.amazonaws.com/myapp/${fileName}`,
                          status: 0
                        })
  let reportDoc = await report.save()
  return reportDoc._id;
}
/**
 * let Report = require('models/report')
 * jest.mock('models/report', () => {
 * return {
 *  
 * }
 * })
 * descrube("when addReport iscalled", () =>  {
 * beforeEach(() => {
 * addReport(params)
 * })
 * it("shpould call constructoir with the right name", () => {
 *    expect(mongoose.model.report).tohaveBeenCalledWith({name: params})
 * })
 * it("should call sace", () => {
 *    expect(save).tohaveBeenCalledTimes(1)
 * })
 * })
 *

/*
  it('report shoud be saved to the db', async done => {
  const res = await request.post('/v1/reports/addReport')
	.send({
      name: 'Sample Data Report',
      video_url: 'https://video_url.com'
    })


  const report = await Report.findOne({ name: 'Sample Data Report' })
  done()
 *
  it('report shoud be updated in db', async done => {
  const res = await request.post('/v1/reports/addReport')
	.send({
      name: 'Sample Data Report',
      video_url: 'https://video_url.com'
    })

  var report = await Report.findOne({ name: 'Sample Data Report' })
  const reportId = report.id
  const res = await request.post('/v1/reports/updateReport/reportId')
	.send({
      data: [20,70,50]
      labels: ["x","y","z"]
      status: 1
    })

  report = await Report.findOne({ status: 1 })
 
  done()
 */

const updateReport = async (reportId,updatedReport) => {
  await Report.updateOne({_id: new ObjectID(reportId)}, {
    status: updatedReport.status,
    labels: updatedReport.labels,
    data: updatedReport.data,

  })
  return await Report.findById(reportId)
}

const searchReport = async (reportId) => {
  return await Report.findById(reportId);
}


module.exports = {
  addReport, 
  searchReport,
  updateReport
};

