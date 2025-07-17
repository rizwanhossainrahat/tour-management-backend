// import { AnyZodObject } from "zod"
import { NextFunction, Request, Response } from "express"
import { ZodObject } from "zod"

// export const validateRequest=(zodSchema:AnyZodObject)=> async (req: Request, res: Response, next: NextFunction)=>{
export const validateRequest=(zodSchema:ZodObject)=> async (req: Request, res: Response, next: NextFunction)=>{
   try {
     req.body=await zodSchema.parseAsync(req.body)
    next()
   } catch (error) {
    next(error)
   }
}