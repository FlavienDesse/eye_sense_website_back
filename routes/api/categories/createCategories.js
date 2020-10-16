let Category = require('../../../models/Category')
let Photos = require('../../../models/Photos')

fs = require('fs');

module.exports = function (req, res, next) {
    let error = false;
    if (req.body.nameCategory === "") {
        res.status(402).json({
            message: {message: 'Error please precise the name of the category'}
        })
        return next()
    } else {
        Category.exists({name: req.body.nameCategory}, async function (err, doc) {
            if (err) {

                res.status(402).json({
                    message: err
                })
                error = true
                return false
            } else if (doc) {
                res.status(402).json({
                    message: {message: "Category name already exists"}
                })
                error = true
                return false
            } else {
                let allId = []
                let savedTemp = []
                if (req.body.allImg.length !== 0) {
                     await Photos.create(req.body.allImg, async function (err, saved) {
                        if (err) {
                            res.status(402).json({
                                message: err
                            })
                            return;
                        } else {
                            for (let i = 0; i < saved.length; i++) {
                                allId.push(saved[i]._id)
                                fs.appendFileSync('Img/' + saved[i]._id, req.body.allImg[i].src.split(';base64,').pop(), 'base64', function (err) {
                                    if (err) {
                                        for (let a = 0; a < i - 1; a++) {
                                            fs.unlink('Img/' + saved[a]._id, function (err) {

                                            })
                                        }
                                        res.status(402).json({
                                            message: err
                                        });

                                        return;
                                    }
                                });
                            }
                            if (error) {
                                return;
                            }
                        }
                    })
                }
                if (error) {
                    return next()
                }
                 Category.create({name: req.body.nameCategory, allPhotos: allId}, function (err) {
                    if (err) {
                        res.status(402).json({
                            message: err
                        })
                        for (let a = 0; a < savedTemp.length; a++) {
                            fs.unlink('Img/' + savedTemp[a]._id, function (err) {

                            })
                        }
                        return;
                    } else {
                        res.status(200).json({
                            message: {message: "The category was added"}
                        })
                        return;
                    }
                })
            }
        })


    }


}
