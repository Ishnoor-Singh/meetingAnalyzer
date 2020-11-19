const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {db} = require('../services');

const addReport = catchAsync(async (req, res) => {
  // body must include 
  console.log("body is ")
  console.log(req.body)
  res.send(httpStatus.status.ok())
  await db.addReport(req.body.report);
});

const searchReport = catchAsync(async (req, res) => {
  // body must include 
  res.send(httpStatus.status.ok())
  await db.searchReport(req.params.reportId);
});

module.exports = {
  addReport,
  searchReport
};
