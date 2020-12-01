const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
// const userController = require('../../controllers/user.controller');
const s3Controller = require('../../controllers/s3.controller');

const router = express.Router();


router
  .route('/saveFile')
  .post(s3Controller.saveFile)

// router
//   .route('/searchReport/:reportId')
//   .get(reportController.searchReport)


module.exports = router;