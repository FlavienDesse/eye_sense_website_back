let Category = require('../../../models/Category')
let Photos = require('../../../models/Photos')

fs = require('fs');

module.exports = function (req, res, next) {
    if (req.body.nameCategory === "") {
        res.status(402).json({
            message: {message: 'Error please precise the name of the category'}
        })
        return next()
    } else {

    }


}
