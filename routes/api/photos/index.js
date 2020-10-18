let express = require('express')
let router = express.Router();

let getPhotos = require('./getPhotos')



router.get('/getPhotos',getPhotos)

module.exports = router;