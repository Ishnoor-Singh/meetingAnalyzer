const fs = require('fs');
const AWS = require('aws-sdk');
// require('dotenv').config()
const BUCKET_NAME = "elasticbeanstalk-us-west-1-516879159697";
const IAM_USER_KEY = "AKIAI3AKGQZ25MWDPIIQ";
const IAM_USER_SECRET = "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";

const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET
})

function uploadToS3(fileName){
  const readStream = fs.createReadStream(`public/${fileName}`);
  console.log(fileName.split('/'))
  console.log(readStream)

  const params = {
    Bucket: BUCKET_NAME,
    Key: "myapp" + "/" + fileName.split('/')[fileName.split('/').length-1],
    Body: readStream
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, function(err, data) {
      readStream.destroy();

      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

function processFile(myFile){
  myFile.mv(`public/${myFile.name}`, function (err) {
    if (err) {
        console.log(err)
        return "Error occured"
    }
    // returing the response with file path and name
    return ('File Saved');
  });

  return uploadToS3(`${myFile.name}`).then(() => ('uploaded')).catch((err) => ('err: ' + err))
}

module.exports={
    processFile,
    uploadToS3
}