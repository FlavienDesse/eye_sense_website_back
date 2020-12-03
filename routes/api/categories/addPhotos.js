let Category = require('../../../models/Category')
let Photos = require('../../../models/Photos')

fs = require('fs');


module.exports = async function (req, res) {


    if( req.body.categorie !== null){
        Category.exists({_id: req.body.categorie._id}, async function (err, doc) {
            if (err) {
                res.status(402).send({
                    message: err
                })
            } else if (doc) {
                if (req.body.allImg.length !== 0) {
                    if(doc.allPhotos.length <6){
                        var error = false;
                        var allPhotoId = []
                        Photos.insertMany(req.body.allImg, async function (err, doc) {
                            if (err) {
                                res.status(402).send({
                                    message: err
                                })
                                error = true;
                            } else {
                                doc.forEach(item => allPhotoId.push(item._id));
                                for (let i = 0; i < allPhotoId.length; i++) {
                                    fs.appendFileSync('Img/' + allPhotoId[i], req.body.allImg[i].src.split(';base64,').pop(), 'base64', function (err) {
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
                                if (error) {
                                    if (error) {
                                        res.status(402).send({
                                            message: {message: "Error to save img"}
                                        })
                                    }
                                } else {
                                    Category.findOne({_id: req.body.categorie._id}, async function (err, doc) {
                                        doc.allPhotos = allPhotoId.concat(doc.allPhotos)
                                        console.log(doc)

                                        await doc.save(({validateBeforeSave: false}))
                                        res.status(200).send({
                                            message: {message: "Success"}
                                        })

                                    })


                                }
                            }
                        })
                    }
                    else{
                        res.status(402).send({
                            message: {message: "Category have already 6 photos"}
                        })
                    }

                } else {
                    res.status(402).send({
                        message: {message: "No photos provided"}
                    })
                }
            }
            else {

                res.status(402).send({
                    message: {message: "No category provided"}
                })
            }
        })
    }
    else{
        res.status(402).send({
            message: {message: "Error"}
        })
    }




}