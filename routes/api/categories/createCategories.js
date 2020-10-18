let Category = require('../../../models/Category')
let Photos = require('../../../models/Photos')

fs = require('fs');

module.exports = function (req, res, next) {
    if (req.body.nameCategory === undefined || req.body.nameCategory === "") {
        res.status(402).json({
            message: {message: 'Error please precise the name of the category'}
        })
    } else {
        Category.exists({name: req.body.nameCategory},async function (err, doc) {
            if (err) {
                res.status(402).send({
                    message: err
                })
            } else if (doc) {
                res.status(402).send({
                    message: {message: "Category name already exist"}
                })
            } else {
                if (req.body.allImg.length !== 0) {
                    var error = false;
                    var allPhotoId = []
                    Photos.insertMany(req.body.allImg, function (err, doc) {
                        if (err) {
                            res.status(402).send({
                                message: err
                            })
                            error=true;
                        } else {
                            doc.forEach(item => allPhotoId.push(item._id));
                            for (let i = 0; i < allPhotoId.length; i++) {
                                fs.appendFileSync('Img/' + allPhotoId[i], req.body.allImg[i].src, 'base64', function (err) {
                                    if (err) {
                                        error = true;
                                        for (let a = 0; a < i - 1; a++) {
                                            fs.unlinkSync('Img/' + allPhotoId[a], function (err) {

                                            })
                                        }
                                        return;
                                    }
                                });
                                if (error) {
                                  break;
                                }
                            }
                            if(error){
                                if (error) {
                                    res.status(402).send({
                                        message: {message: "Error to save img"}
                                    })
                                }
                            }
                            else {
                                Category.create({
                                    name: req.body.nameCategory,
                                    allPhotos: allPhotoId
                                }, function (err) {
                                    if (err) {
                                        //TODO delete file and delete photos in DB
                                    } else {
                                        res.status(200).send({
                                            message: {message: "Success"}
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
                else {
                    Category.create({
                        name: req.body.nameCategory,
                        allPhotos: []
                    }, function (err) {
                        if (err) {
                            res.status(402).send({
                                message: err
                            })
                        } else {
                            res.status(200).send({
                                message: {message: "Success"}
                            })
                        }
                    })
                }
            }
        })
    }


}
