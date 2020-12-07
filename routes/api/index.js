let express = require('express')
let router = express.Router();

let photos = require('./photos/index')
let categories = require('./categories/index')
let test = require('./Test/index')


router.use('/categories',categories)
router.use('/photos',photos)
router.use('/test',test)


module.exports = router