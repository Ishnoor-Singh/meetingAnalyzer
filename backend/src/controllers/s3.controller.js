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
                            .then(async prevRes => {
                                console.log('prevRes '+prevRes)
                                const id = await dbService.addReport(myFile.name)
                                console.log('is id '  + id)
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
    console.table({status, msg})
    return res.status(status).send({ msg })
})

module.exports = {
    saveFile
}
