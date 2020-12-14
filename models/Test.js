const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;




const testSchema = new Schema(
    {
        creation_date: {
            type: Date,
            default: Date.now,
        },
        gender :{
          type:String,
          default:""
        },
        age:{
          type:Number,
        },
        category:{
          type:"String",
        },
        first_look:{
          type:[ObjectId]
        },
        time_look:{
          type:Array,
        },
        screen_size:{
            width : {
                type:Number
            },
            height : {
                type:Number
            }
        }

    },
);


const Test = mongoose.model('Test', testSchema,'UsersData');

module.exports = Test;


