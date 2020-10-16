let Category = require('../../../models/Category')
let Photos = require('../../../models/Photos')
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = async function (req,res,next){
    let error = false;
    if(req.body.arrayId === undefined){
        res.status(402).json({
            message: {message: 'Error please precise the id of the category'}
        })
        return next()
    }
    else {
        if(req.body.arrayId.every(i => (ObjectId.isValid(i)))) {

            for (const _id of req.body.arrayId){

                await Category.findOneAndDelete({_id:_id}, function(err,doc){
                    if(err){
                        res.status(405).json({
                            message:err
                        })
                        error= true
                        return
                    }
                    else if(!doc){
                        res.status(402).json({
                            message: {message: 'Error category unfindable'}
                        })
                        error= true


                        return
                    }
                    else{
                        Photos.deleteMany({_id: {$in :doc.allPhotos}},function(err){
                            if(err){
                                console.log("3")
                                res.status(402).json({
                                    message: {message: 'Error delete photos'}
                                })
                                error= true
                                return
                            }
                        })

                    }
                })
            }
            if(error){
                return next()
            }

        }else{
            res.status(402).json({
                message: {message: 'Error please precise a correct id'}
            })
            return;
        }

    }
    if(!error){
        console.log("5")
        res.status(402).json({
            message: {message: 'Success'}
        })
    }

}