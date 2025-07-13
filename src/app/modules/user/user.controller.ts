import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userServices } from "./user.service";
// import AppError from "../../errorHelpers/appError";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";



// const createUser=async(req:Request,res:Response,next:NextFunction)=>{
//         try {
//             // const {name,email}=req.body;
//             // console.log(name)
//             // const user=await User.create({
//             //     name,
//             //     email
//             // })

//             // throw new Error("Fake Error")
//             // throw new AppError(StatusCodes.BAD_REQUEST,"fake error")

//             const user=await userServices.createUser(req.body)

//             res.status(StatusCodes.CREATED).json({
//                 message:"user is created",
//                 user
//             })
//         } catch (error:any) {
//             // res.status(StatusCodes.BAD_REQUEST).json({
//                 // message:`Something went wrong ${error}`
//             // })
//              next(error)
//         }
// }


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body)

    // res.status(httpStatus.CREATED).json({
    //     message: "User Created Successfully",
    //     user
    // })

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user,
    })
   
})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUsers();

    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully",
    //     data: users
    // })

       sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
   
})


export const UserControllers={
    createUser,
    getAllUsers
}