const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const reportsRoute = require('./reports.route')
const s3Route = require('./s3.route')


const router = express.Router();

// router.use('/auth', authRoute);
// router.use('/users', userRoute);
// router.use('/docs', docsRoute);
router.use('/reports',reportsRoute);
router.use('/s3', s3Route);


module.exports = router;
