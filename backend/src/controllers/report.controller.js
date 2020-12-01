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
  res.send(report)
});

module.exports = {
  addReport,
  updateReport,
  searchReport
};
