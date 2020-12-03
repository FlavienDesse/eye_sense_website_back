let Photos = require('../../../models/Photos')
const fs = require('fs')

module.exports = function (req,res){
    let id = req.query.id;
    if( fs.existsSync(appRoot+'/Img/'+id)){
        res.sendFile(appRoot+'/Img/'+id)
    }
    else{
        res.sendFile(appRoot+'/Img/NotFound.png')
    }

}