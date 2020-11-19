
require('dotenv').config()
const mongoose = require('mongoose');


const reportSchema = new mongoose.Schema({
  name: String,
  labels : [String],
  data : [Number]
});

// class is returned from .model
const Report = mongoose.model('Report', reportSchema);

const addReport = async (reportJson) => {
  report = new Report({name: reportJson.name, labels: reportJson.labels, data: reportJson.data})
  let reportDoc = await report.save()
  return reportDoc._id;
}

const searchReport = async (reportId) => {
  return await Report.findById(reportId);
}


module.exports = {
  addReport, 
  searchReport,
};

