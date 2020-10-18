let Category = require('../../../models/Category')
let Photos = require('../../../models/Photos')
var ObjectId = require("mongoose").Types.ObjectId;

function deleteOnePhotos(id){
    let error = false
    Photos.findOneAndDelete({_id:id},function (err,doc){
        if(err){
            res.status(402).json({
                message: err
            })
            error = true
        }
        else {
            fs.unlinkSync('Img/' + id, function (err) {

            });
        }
    })
    return error
}

function deleteOneCategory(id){
    let error = false
    Category.findOneAndDelete({_id:id},function (err,doc){
        if(err){
            res.status(402).json({
                message: err
            })
            error = true
        }
        else if(doc){
            for (let i = 0 ; i<doc.allPhotos.length ; i++){
                if(deleteOnePhotos(doc.allPhotos[i])){
                    error=true;
                    break;
                }
            }

        }

    })
    return error
}


module.exports=function (req,res){
    //"arrayId":["po"]

    if (req.body.arrayId === undefined || req.body.arrayId.length === 0 || !req.body.arrayId.every(i => ObjectId.isValid(i)) ){
        res.status(402).json({
            message: {message: 'Error please precise a correct array of id'}
        })
    }
    else{
        for (let i = 0 ; i<req.body.arrayId.length ; i++){
            if(deleteOneCategory(req.body.arrayId[i])){
                return
            }
        }
        res.status(200).json({
            message: {message: 'Success'}
        })
    }
}