const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { dbService } = require('../services');

const addReport = catchAsync(async (req, res) => {
  // body must include 
  // res.status(httpStatus.NO_CONTENT).send();
  const id = await dbService.addReport(req.body);
  res.send(id)
});

const searchReport = catchAsync(async (req, res) => {
  // body must include 
  // res.status(httpStatus.NO_CONTENT).send();
  const report = await dbService.searchReport(req.params.reportId);
  res.send(report)
});

module.exports = {
  addReport,
  searchReport
};
