let Category = require('../../../models/Category')
let Photos = require('../../../models/Photos')
var ObjectId = require("mongoose").Types.ObjectId;



module.exports=async function (req,res){
    if (req.body.idImage === undefined 
        || !ObjectId.isValid(req.body.idImage) 
        || req.body.idCategory === undefined 
        || !ObjectId.isValid(req.body.idCategory)) 
    {
        res.status(402).json({
            message: {message: 'Error please precise a correct id'}
        })
    }
    else{
        let error = false
        Photos.findOneAndDelete({_id:req.body.idImage},function (err,doc){
            if(err){
                res.status(402).json({
                    message: err
                })
                error = true
            }
            else {
                fs.unlinkSync('Img/' + req.body.idImage, function (err) {
                    if (err) {
                        error = true
                    }
                });
                Category.findOne({_id: req.body.idCategory},async function (err,doc) {
                    if(err){
                        res.status(402).json({
                            message: err
                        })
                        error = true
                    }
                    else {
                        let index = doc.allPhotos.indexOf(req.body.idImage)
                        doc.allPhotos.splice(index, 1)
                        await doc.save()
                        res.status(200).json({
                            message: {message: 'Success'}
                        })
                    }
                })
            }
        })
            
        
    }
}