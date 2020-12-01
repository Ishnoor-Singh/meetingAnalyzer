const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { s3Service } = require('../services');


// app.post('/upload', (req, res) => {
    // if (!req.files) {
    //     return res.status(500).send({ msg: "file is not found" })
    // }
    //     // accessing the file
    // const myFile = req.files.file;
//     //  mv() method places the file inside public directory
//     myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
//         if (err) {
//             console.log(err)
//             return res.status(500).send({ msg: "Error occured" });
//         }
//         // returing the response with file path and name
//         return res.send({name: myFile.name, path: `/${myFile.name}`});
//     });

//     uploadToS3(`${__dirname}/public/${myFile.name}`).then(() => console.log('uploaded')).catch((err) => console.log('err: ' + err))

// })

const saveFile = catchAsync(async (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    console.log('here')
    // accessing the file
    const myFile = req.files.file;
    const r = await s3Service.processFile(myFile)
    res.json({status: r})
})

module.exports = {
    saveFile
}