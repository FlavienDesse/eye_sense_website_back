let express = require('express')
let router = express.Router();

let createCategories = require('./createCategories')
let addPhotos = require('./addPhotos')
let getAllCategories = require('./getAllCategories')
let deleteCategories = require('./deleteCategories')


router.post('/createCategories',createCategories)
router.post('/addPhotos',addPhotos)
router.get('/getAllCategories',getAllCategories)
router.post('/deleteCategories',deleteCategories)


module.exports = router;