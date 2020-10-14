let express = require('express')
let router = express.Router();

let photos = require('./categories/index')

router.use('/photos',photos)

module.exports = router