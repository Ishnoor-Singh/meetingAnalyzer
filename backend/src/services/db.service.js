
require('dotenv').config()
const mongoose = require('mongoose');


const reportSchema = new mongoose.Schema({
  video_name: String,
  status: String,
  name: String,
  labels : [String],
  data : [Number]
});

// class is returned from .model
const Report = mongoose.model('Report', reportSchema);

const addReport = async (reportName) => {
  report = new Report({name: reportName})
  let reportDoc = await report.save()
  return reportDoc._id;
}

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
  Report.updateOne({_id: reportId}, {
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

