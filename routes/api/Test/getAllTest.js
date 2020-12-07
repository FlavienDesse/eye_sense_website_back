let Test = require('../../../models/Test')


module.exports = function (req, res) {
    Test.find({},function (err,result){
        if(err){
            res.status(402).json({
                message: err
            })
        }else{
            res.status(200).send(result)
        }
    })
}
