const express = require('express');
const docsRoute = require('./docs.route');
const reportsRoute = require('./reports.route')
const s3Route = require('./s3.route')


const router = express.Router();

router.use('/docs',docsRoute);
router.use('/reports',reportsRoute);
router.use('/s3', s3Route);


module.exports = router;
