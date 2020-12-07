let express = require('express')
let router = express.Router();

let getAllTest = require('./getAllTest')



router.get('/getAllTest',getAllTest)

module.exports = router;