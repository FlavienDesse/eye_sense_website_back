let Category = require('../../../models/Category')
let Photos = require('../../../models/Photos')

fs = require('fs');

module.exports = function (req, res) {
    if (req.body.nameCategory === "") {
        res.status(402).json({
            message: {message: 'Error please precise the name of the category'}
        })
    } else {
        Category.find({name: req.body.nameCategory}, function (err, doc) {
            if (err) {
                res.status(402).json({
                    message: err
                })
            } else if (!doc) {
                res.status(402).json({
                    message: {message: "No category has this name"}
                })
            } else {
                Photos.create(req.body.allImg, function (err, saved) {
                    if (err) {
                        res.status(402).json({
                            message: err
                        })
                        return;
                    } else {
                        let allId = []
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
                        doc.allPhotos = doc.allPhotos.concat(allId)
                        doc.save(function (err, result) {
                            if (err) {
                                res.status(402).json({
                                    message: err
                                })
                                for (let a = 0; a < saved.length; a++) {
                                    fs.unlink('Img/' + saved[a]._id, function (err) {

                                    })
                                }
                                return;
                            }
                        })
                        res.send(200).json({
                            message: {message:"Photos added to " + req.body.nameCategory}
                        })
                    }
                })

            }
        })
    }
}
