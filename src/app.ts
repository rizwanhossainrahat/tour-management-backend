import {Server} from "http";
import  express, { Request, Response }  from "express";
import mongoose from "mongoose";

const app=express();

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        message:"Welcome to tour management system backend"
    })
})

export default app;