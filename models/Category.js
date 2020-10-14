const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const CategorySchema = new Schema({

    name :{
        type : String,
        required:true,
        unique:true,
    },
    allPhotos:{
        type : [ObjectId],
    }

});

const Category = new mongoose.model("Category", CategorySchema);

module.exports = Category