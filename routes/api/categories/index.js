let express = require('express')
let router = express.Router();

let createCategories = require('./createCategories')
let addPhotos = require('./addPhotos')
let getAllCategories = require('./getAllCategories')
let deleteCategories = require('./deleteCategories')
let deletePhotos = require('./deletePhotos')


router.post('/createCategories',createCategories)
router.post('/addPhotos',addPhotos)
router.get('/getAllCategories',getAllCategories)
router.post('/deleteCategories',deleteCategories)
router.post('/deletePhotos',deletePhotos)


module.exports = router;