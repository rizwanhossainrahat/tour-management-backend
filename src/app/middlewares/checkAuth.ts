import AppError from "../errorHelpers/AppError";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import httpStatus from "http-status-codes";
import { User } from "../modules/user/user.model";
import { isActive } from "../modules/user/user.interface";

export const checkAuth=(...authRoles:string[])=>async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const accessToken=req.headers.authorization || req.cookies.accessToken;
        if(!accessToken){
            throw new AppError(403,"Token not recived")
        }
        const verifiedToken=verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload

         const isUserExist=await User.findOne({email:verifiedToken.email })
    if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST,"Email does not exist")
    }
    // if (!isUserExist.isVerified) {
    //         throw new AppError(httpStatus.BAD_REQUEST, "User is not verified")
    //     }
    if(isUserExist.isActive ===isActive.BLOCKED || isUserExist.isActive ===isActive.INACTIVE ){
        throw new AppError(httpStatus.BAD_REQUEST,`User is ${isUserExist.isActive}`)
    }
    if(isUserExist.isDeleted){
        throw new AppError(httpStatus.BAD_REQUEST,`User is deleted`)
    }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route!!!")
        }


        if(!authRoles.includes(verifiedToken.role)){
             throw new AppError(403,"You are not permitted to view this route!! ")
        }
        req.user=verifiedToken
        next()
        
    } catch (error) {
        console.log("jwt error", error);
        next(error)
    }

    
}