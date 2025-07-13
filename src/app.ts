import cors from "cors"
import  express, { NextFunction, Request, Response }  from "express";

import { router } from "./app/routes";
import { envVars } from "./app/config/env";
import { golbalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { StatusCodes } from "http-status-codes";
import notFound from "./app/middlewares/notFound";



const app=express();

app.use(express.json())
app.use(cors())


app.use("/api/v1",router)

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        message:"Welcome to tour management system backend"
    })
})

app.use(golbalErrorHandler)

app.use(notFound)

export default app;