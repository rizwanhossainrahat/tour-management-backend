import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";
import { createUserToken } from "../../utils/userToken";
import { envVars } from "../../config/env";
import passport from "passport";


//email ,password login
const credentialsLogin=catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body)

   

    setAuthCookie(res,loginInfo)

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: "User login Successfully",
        data: loginInfo,
    })
   
})

//email ,password login using passport 
// const credentialsLogin=catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//      passport.authenticate("local",async(err: any, user: any, info: any)=>{

//     if(err){
//       return next(new AppError(401, err))
//     }

//     if(!user){
//        return next(new AppError(401,info.message))
//     }

//     const userTokens=  createUserToken(user)

//     // delete user.toObject().password

//    const { password: pass, ...rest } = user.toObject()

//      setAuthCookie(res,userTokens)

//       sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.ACCEPTED,
//         message: "User login Successfully",
//         data: {
//           accessToken:user.accessToken,
//           refreshToken:user.refreshToken,
//           user:rest
//         }
//     })

//   })(req,res,next)

//     // res.cookie("accessToken",loginInfo.accessToken,{
//     //     httpOnly:true,
//     //     secure:false
//     // })
//     // res.cookie("refreshToken",loginInfo.refreshToken,{
//     //     httpOnly:true,
//     //     secure:false
//     // })

   
   
// })

const getNewAccessToken=catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken=req.cookies.refreshToken
    if(!refreshToken){
        throw new AppError(httpStatus.BAD_REQUEST,"No Token recieve from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken)
      // res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

    setAuthCookie(res, tokenInfo);

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: "New access token retrived  Successfully",
        data: tokenInfo,
    })
   
})

const logout=catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   
    res.clearCookie("accessToken",{
      httpOnly:true,
      secure:false,
      sameSite:"lax",
    })
    res.clearCookie("refreshToken",{
      httpOnly:true,
      secure:false,
      sameSite:"lax",
    })

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: "User logged out Successfully",
        data: null,
    })
   
})
const resetPassword=catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   
  const oldPassword=req.body.oldPassword;
  const newPassword=req.body.newPassword;
  const decodedToken=req.user;

  await AuthServices.resetPassword(oldPassword,newPassword,decodedToken as JwtPayload)
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password change Successfully",
        data: null,
    })
   
})

const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    let redirectTo = req.query.state ? req.query.state as string : ""

    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }

    // /booking => booking , => "/" => ""

    const user = req.user;
    
    
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }

    const tokenInfo =await createUserToken(user)

    setAuthCookie(res, tokenInfo)

    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Password Changed Successfully",
    //     data: null,
    // })

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})

export const AuthControlles={
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController
}