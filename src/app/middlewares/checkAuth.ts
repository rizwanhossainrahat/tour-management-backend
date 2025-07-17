import AppError from "../errorHelpers/AppError";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";

export const checkAuth=(...authRoles:string[])=>async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const accessToken=req.headers.authorization;
        if(!accessToken){
            throw new AppError(403,"Token not recived")
        }
        const verifiedToken=verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload

        if(!authRoles.includes(verifiedToken.role)){
             throw new AppError(403,"You are not permitted to view this route!! ")
        }
        req.user=verifiedToken
        next()
        console.log(verifiedToken)
    } catch (error) {
        next(error)
    }

    
}