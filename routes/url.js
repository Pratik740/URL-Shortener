const express = require('express')
const router = express.Router();
const {handleGenerateNewShortUrl , handleResolveShortUrl , handleGetAnalytics} = require('../controllers/url')

router  
    .route('/')
    .post(handleGenerateNewShortUrl)

router  
    .route('/:shortid')
    .get(handleResolveShortUrl) 

router
    .route('/analytics/:shortid')
    .get(handleGetAnalytics)


module.exports = router;    