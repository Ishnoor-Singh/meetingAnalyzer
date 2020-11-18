const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {db} = require('../services');

const addReport = catchAsync(async (req, res) => {
  // body must include 
  await db.addReport(req.body.report);
  res.send(200);
});

const searchReport = catchAsync(async (req, res) => {
  // body must include 
  await db.searchReport(req.query.reportId);
  res.send(200)
});

module.exports = {
  addReport,
  searchReport
};
