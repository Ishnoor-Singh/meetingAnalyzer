const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { dbService } = require('../services');

const addReport = catchAsync(async (req, res) => {
  // TODO: Add the s3 bucket info
  // creates empty document
  const id = await dbService.addReport(req.body);
  res.send(id)
});

const updateReport = catchAsync(async (req, res) => {
  const report = await dbService.updateReport(req.params.reportId,req.body);
  // res.status(httpStatus.NO_CONTENT).send();
  res.send(report)
});

const searchReport = catchAsync(async (req, res) => {
  const report = await dbService.searchReport(req.params.reportId);
  let status;
  if (parseInt(report.status) ===  0){
    status = 206
  } else {
    status = 200
  }
  // TODO: remove
  await dbService.updateReport(req.params.reportId, {labels:['5', '10', '15'], data:[Math.random()*15, Math.random()*100, Math.random()*50], status: 1})

  res.status(status).send({report, msg: status === 200?'Report Ready':'Processing Video'})

});

module.exports = {
  addReport,
  updateReport,
  searchReport
};
