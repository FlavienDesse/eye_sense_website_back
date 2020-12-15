const app = require('./app.js')
require('dotenv').config()

const http = require('./http.js')
const socket = require("socket.io")
const mongoose = require("mongoose");
let io = socket(http,{pingTimeout: 60000})



mongoose.connect("mongodb+srv://"
    + process.env.DATABASE_USER
    + ":"
    + process.env.DATABASE_PASSWORD
    + "@"
    + process.env.DATABASE_DOMAIN,
    {useCreateIndex: true,useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
).then(function(){
    console.log("Connected to Database");
}).catch(function(error){
    console.log("Error" + error);
});


io.on("connection",socketIO)




var socketUnity;
const websiteNamespace = io.of("/websiteNamespace")

websiteNamespace.on('connection', socket => {
    console.log("New website connected , id :" + socket.id);
    socket.on('send user data', (res) => {
        socketUnity.emit('get user data', res)
    })
    socket.on('send photos', (res) => {

        socketUnity.emit('get photos', res)
    })
    socket.on('test finished', (res) => {
        socketUnity.emit('test finished', res)
    })
});




async function socketIO(socket){

    if(socket.handshake.query.unity){
        console.log("New unity connected , id :" + socket.id);
        socketUnity = socket
    }



}


















