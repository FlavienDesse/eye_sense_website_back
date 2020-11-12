let Category = require('../../../models/Category')
let Photos = require('../../../models/Photos')
var ObjectId = require("mongoose").Types.ObjectId;

async function deleteOnePhotos(id,res){
    let error = false
    await Photos.findOneAndDelete({_id: id}, function (err, doc) {
        if (err) {
            res.status(402).json({
                message: err
            })
            error = true
        } else {
            fs.unlinkSync('Img/' + id, function (err) {

            });
        }
        return error
    });
    return error

}

async function deleteOneCategory(id,res){
    let error = false
    await Category.findOneAndDelete({_id:id},async function (err,doc){
        if(err){
            res.status(402).json({
                message: err
            })
            error = true
        }
        else if(doc){
            for (let i = 0 ; i<doc.allPhotos.length ; i++){
                if(await deleteOnePhotos(doc.allPhotos[i],res)){
                    error=true;
                    break;
                }
            }
        }
        else {
            res.status(402).json({
                message: {message:"No categories find with the provided id"}
            })
            error = true
        }
        return error
    })
    return error
}


module.exports=async function (req,res){
    //"arrayId":["po"]

    let error = false
    if (req.body.arrayId === undefined || req.body.arrayId.length === 0 || !req.body.arrayId.every(i => ObjectId.isValid(i)) ){
        res.status(402).json({
            message: {message: 'Error please precise a correct array of id'}
        })
    }
    else{
        for (let i = 0 ; i<req.body.arrayId.length ; i++){
            if(await deleteOneCategory(req.body.arrayId[i],res)){
                error = true
            }
        }
        if(!error){
            res.status(200).json({
                message: {message: 'Success'}
            })
        }

    }
}