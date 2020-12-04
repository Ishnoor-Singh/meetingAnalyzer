const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
// const userController = require('../../controllers/user.controller');
const s3Controller = require('../../controllers/s3.controller');

const router = express.Router();


/**
 *  @swagger
 *
 * path:
 * /v1/s3/saveFile/:
 *   post:
 *      summary: Add a new file to be analyzed
 *      consumes:
 *         - application/json
 *      parameters:
 *         - name: FormData
 *           in: body
 *           description: An object representing the file being uploaded
 *           schema:
 *              type: Object
 *              required:
 *                 - File
 *              properties:
 *                 File:
 *                    type: string
 *      responses:
 *        500:
 *          description: Improper file input in post or if unable to add file to S3 bucket
 *        201:
 *          description: Returns the id of the uploaded report
 */

router.post('/saveFile', s3Controller.saveFile)
// router.route('/saveFile').post(s3Controller.saveFile)



module.exports = router;
