const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
// const userController = require('../../controllers/user.controller');
const reportController = require('../../controllers/report.controller');

const router = express.Router();

/**
 *  @swagger
 *
 * path:
 * /v1/reports/{searchReport}:
 *   get:
 *     required: 
 *        - reportId
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         type: string
 *         schema: 
 *            type: string 
 *     description: Returns a report if it exists
 *     responses:
 *        200:
 *          description: Returns a report that has completed processing
 *        206:
 *          description: Returns a report that has not yet completed processing
 *        404:
 *          description: No report with such an id exists
 */

router
  .route('/searchReport/:reportId')
  .get(reportController.searchReport)


module.exports = router;
