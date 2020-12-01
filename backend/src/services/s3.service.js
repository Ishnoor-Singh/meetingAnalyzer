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
  const readStream = fs.createReadStream(fileName);
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

function processFile(myFile, req, res){
     myFile.mv(`public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return ({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return ({name: myFile.name, path: `/${myFile.name}`});
    });

    return uploadToS3(`public/${myFile.name}`).then(() => console.log('uploaded')).catch((err) => console.log('err: ' + err))
}

// function saveFile(params) {
    
// }

module.exports={
    processFile
}