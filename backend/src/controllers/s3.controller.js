const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { s3Service, dbService } = require('../services');

const saveFile = catchAsync(async (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    // accessing the file
    const myFile = req.files.file;

    const {status, msg} = await s3Service
                            .processFile(myFile)
                            .then(async _ => {
                                const id = await dbService.addReport(myFile.name)
                                return {
                                    status: 201,
                                    msg: {
                                        id
                                    }
                                }
                            }).catch(err => {
                                return {
                                    status: 500,
                                    msg:err
                                }
                            })
    return res.status(status).send({ msg })
})

module.exports = {
    saveFile
}
