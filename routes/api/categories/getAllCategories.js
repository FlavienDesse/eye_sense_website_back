let Category = require('../../../models/Category')


module.exports = function (req, res) {
    Category.find({},function (err,result){
        if(err){
            res.status(402).json({
                message: err
            })
            return;
        }else{
            res.status(200).send(result)
            return;
        }
    })
}
