import express, { json } from "express"
import dotenv from "dotenv"
import {Server} from "socket.io"
import http from "http"
import cors from "cors"
import connectToMongodb from "./db/connectToMongodb.js"
import { addMsgToConversation } from "./controllers/msgs.controller.js"
import msgrouter from "./routes/msgs.routes.js"
import {subscribe, publish } from "./redis/msgsPubSub.js"

dotenv.config()
const Port = process.env.PORT || 8080
const app = express()
app.use(cors({
    credentials:true,
    origin: ["http://localhost:3000","http://localhost:3001", `${process.env.HOST}:3000`, `${process.env.HOST}:3001`],
    methods: "GET,POST"
}))
const server = http.createServer(app)
const io = new Server (server, {
    cors:{
        allowedHeaders : ["*"],
        origin: "*",
        allowedMeathods: ['GET','POST']
    }
})

const userSocketmap={}
io.on('connection',(socket)=>{
    console.log('client connected!!');
    const username = socket.handshake.query.username
    userSocketmap[username]=socket
    console.log("Username:"+ username);

    const channel_name=`chat_${username}`
    subscribe(channel_name,(msg)=>{
        console.log("Received msg"+msg);
        socket.emit('chat msg',JSON.parse(msg))
    })

    socket.on('chat msg',(msg)=>{

        console.log(msg.sender);
        console.log(msg.receiver);
        console.log(msg.msg);
        addMsgToConversation([msg.sender,msg.receiver],{
            msg: msg.msg,
            sender: msg.sender,
            receiver: msg.receiver
        })
        const receiverSocket = userSocketmap[msg.receiver]
        if (receiverSocket){
            receiverSocket.emit('chat msg',msg)
        }
        else{
            const channel_name = `chat_${msg.receiver}`
            publish(channel_name,JSON.stringify(msg))
        }
    })
})

app.use('/msgs',msgrouter)

app.get ('/',(req,res)=>{
    res.send("Welcome to HHld")
})

server.listen(Port,(req,res)=>{
    connectToMongodb()
    console.log("server is connected to port: "+Port );
})