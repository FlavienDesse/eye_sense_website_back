const app = require('./app.js')
require('dotenv').config()

const http = require('./http.js')
const socket = require("socket.io")
const mongoose = require("mongoose");
let io = socket(http)

mongoose.connect("mongodb+srv://"
    + process.env.DATABASE_USER
    + ":"
    + process.env.DATABASE_PASSWORD
    + "@"
    + process.env.DATABASE_DOMAIN,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
).then(function(){
    console.log("Connected to Database");
}).catch(function(error){
    console.log("Error" + error);
});





io.on("connection", socketIO)

function socketIO(socket) {
    console.log("suis connecté woolah")
}





















