let express = require('express')
let router = express.Router();

let photos = require('./photos/index')
let categories = require('./categories/index')

router.use('/categories',categories)
router.use('/photos',photos)


module.exports = router