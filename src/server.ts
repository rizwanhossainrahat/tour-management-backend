import {Server} from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";


let server:Server;



const startServer=async()=>{
    try{
        // await mongoose.connect('mongodb+srv://todo:Hzz9WxZw0z9zHHQ4@cluster0.iwcqk.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0')
        await mongoose.connect(envVars.DB_URL)
        console.log("connected to DB!!")
        server=app.listen(envVars.PORT,()=>{
            console.log(`server is litening to post ${envVars.PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}

startServer()

process.on("unhandledRejection",(err)=>{
    console.log("unhandledRejection caught server is shutting down",err)
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
     process.exit(1)
})

process.on("uncaughtException",(err)=>{
    console.log("exception caught server is shutting down",err)
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
     process.exit(1)
})

process.on("SIGTERM",()=>{
    console.log("sigterm singnal recived server is shutting down")
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
     process.exit(1)
})

process.on("SIGINT",()=>{
    console.log("sigint  singnal is  recived server is shutting down")
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
     process.exit(1)
})

// Promise.reject(new Error("i forgot to cath this promise"))
// throw new Error("i forgot to handle this local error")