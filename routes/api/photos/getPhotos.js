let Photos = require('../../../models/Photos')


module.exports = function (req,res){
    let id = req.query.id;
    res.sendFile(appRoot+'/Img/'+id)
}