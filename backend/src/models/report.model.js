const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  video_name: String,
  status: String,
  name: String,
  labels : [String],
  data : [Number]
});

const Report = mongoose.model('Report', reportSchema);

module.exports={
    Report
}