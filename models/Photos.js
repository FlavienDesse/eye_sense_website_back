const mongoose = require('mongoose')
const Schema = mongoose.Schema;




const photosSchema = new Schema(
    {
        creationDate: {
            type: Date,
            default: Date.now,
            required: true
        },
        name: {
            type: "String",
            required: true,
        },
        extension:{
            type:"String",
            required:true,
        }
    },
);


const Photos = mongoose.model('Photos', photosSchema);

module.exports = Photos;


















