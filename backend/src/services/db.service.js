
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
  report.save(function (err, _) {
    if (err) return console.error(err);
  });
}

const searchReport = async (reportId) => {
  await Report.findById(reportId)
    .exec(function (dbErr,modelReport) {
      if (dbErr) return console.error(dbErr)
      return res.send(modelReport.toJSON(),200)
    })
}


module.exports = {
  // connectDB,
  addReport, 
  searchReport,
};

