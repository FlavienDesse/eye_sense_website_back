let Category = require('../../../models/Category')
let Photos = require('../../../models/Photos')
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = function (req,res){
    if(req.body.arrayId === undefined){
        res.status(402).json({
            message: {message: 'Error please precise array of id'}
        })
        return
    }
    else {
        if(req.body.arrayId.every(i => (ObjectId.isValid(i)))) {
            Category.updateMany({allPhotos : {$in :req.body.arrayId }},function (err,doc){
                if(err){
                    res.status(402).json({
                        message:err
                    })
                    return;
                }
                else{
                    console.log(doc)
                    res.status(402).json({
                        message:"lol"
                    })
                    return;
                }
            })
            Photos.deleteMany({_id: {$in :req.body.arrayId}},function(err){
                if(err){
                    res.status(402).json({
                        message: err
                    })
                    return;

                }
                else {

                }
            })
        }else{
            res.status(402).json({
                message: {message: 'Error please precise a correct array of id'}
            })
        }

    }
}