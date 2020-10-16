let Category = require('../../../models/Category')
let Photos = require('../../../models/Photos')
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = function (req,res){

    if(req.body._id === undefined){
        res.status(402).json({
            message: {message: 'Error please precise the id of the category'}
        })
        return
    }
    else {
        if(ObjectId.isValid(req.body._id)) {
            Category.findOneAndDelete({_id:req.body._id},function(err,doc){
                if(err){
                    console.log(err)
                    res.status(405).json({
                        message:err
                    })
                    return
                }
                else if(!doc){
                    res.status(402).json({
                        message: {message: 'Error category unfindable'}
                    })
                    return
                }
                else{
                    Photos.deleteMany({_id: {$in :doc.allPhotos}},function(err){
                        if(err){
                            res.status(402).json({
                                message: {message: 'Error delete photos'}
                            })
                            return;

                        }
                        else {
                            res.status(402).json({
                                message: {message: 'Success , category has been successfull deleted'}
                            })
                        }
                    })

                }
            })
        }else{
            res.status(402).json({
                message: {message: 'Error please precise a correct id'}
            })
        }

    }
}