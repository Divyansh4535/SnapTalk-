import express from "express";
import { Server } from "socket.io";
import {createServer} from "http";
import cors from "cors"; // Importing CORS middleware

const port = 3000
const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true
}))
const server =createServer(app)

    const io= new Server(server,{
        cors:{
            origin:"http://localhost:5173",
            methods:["GET","POST"],
            credentials:true
        }
    })


app.get("/",(req,res)=>{
    res.send("Hello DK! ")
})

io.on("connection",(socket)=>{
    console.log("User Connected ");
    console.log("ID", socket.id);
    // socket.emit("welcome", `Welcome to the server, your socket id is ${socket.id}`);
    // socket.broadcast.emit("welcome", `${socket.id} joined the server`); //like a left the whatsapp group 
    socket.on("message",({roomId,message})=>{
        console.log('MyMsg :', {roomId,message}) 
        // io.emit("receive-message",message)  // all socket ko show hoga  
        // socket.emit("receive-message",data)
        // socket.broadcast.emit("receive-message",data)   // jo send krega uske alava sab ko show hoga
        io.to(roomId).emit("receive-message", roomId,message)  // only room id wale   ko show hoga  
  
    })
        socket.on("join-room", (roomName)=>{
            socket.join(roomName)
        } )

    socket.on("disconnect",()=>{
        console.log(`User Disconnected ${socket.id}`);
        
    })
})

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);    
})

