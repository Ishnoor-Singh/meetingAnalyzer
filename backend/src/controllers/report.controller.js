const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { dbService } = require('../services');

const searchReport = catchAsync(async (req, res) => {
  const report = await dbService.searchReport(req.params.reportId);
  if (report == null){
    res.status(404).send()
    return
  }

  let status;
  if (parseInt(report.status) ===  0){
    status = 206
  } else {
    status = 200
  }
  // TODO: remove
  // await dbService.updateReport(req.params.reportId, {labels:['5', '10', '15'], data:[Math.random()*15, Math.random()*100, Math.random()*50], status: 1})

  res.status(status).send({report, msg: status === 200?'Report Ready':'Processing Video'})

});

module.exports = {
  // addReport,
  // updateReport,
  searchReport
};
