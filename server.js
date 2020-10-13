const app = require('./app.js')
const http = require('./http.js')
const socket = require("socket.io")

let io = socket(http)


io.on("connection",socketIO)

function socketIO(socket){
    console.log("suis connecté woolah")
}