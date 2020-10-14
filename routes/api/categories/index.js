let express = require('express')
let router = express.Router();

let createCategories = require('./createCategories')
let addPhotos = require('./addPhotos')
let getAllCategories = require('./getAllCategories')


router.post('/createCategories',createCategories)
router.post('/addPhotos',addPhotos)
router.get('/getAllCategories',getAllCategories)


module.exports = router;