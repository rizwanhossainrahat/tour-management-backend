import { catchAsync } from "../../utils/catchAsync"
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { DivisonServices } from "./division.service";

const createDivison = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const division = await DivisonServices.createDivison(req.body)

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Division Created Successfully",
        data: division,
    })

    })

const getAllDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const division = await DivisonServices.getAllDivision(query as Record<string, string>);

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: "All Division retreived Successfully",
        data: division,
    })

    })

// const getAllDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const division = await DivisonServices.getAllDivision()

//       sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.ACCEPTED,
//         message: "All Division retreived Successfully",
//         data: division,
//     })

//     })

const getSingleDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const slug=req.params.slug;
   
    const division = await DivisonServices.getSingleDivision(slug)
   
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: " Division retreived Successfully",
        data: division,
    })

    })

const updateDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const id=req.params.id;
  
    const division = await DivisonServices.updateDivision(id,req.body)
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: " Division updated Successfully",
        data: division,
    })

    })

const deleteDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id=req.params.id;
    const deleteDivision=await DivisonServices.deleteDivision(id)
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: " Division deleted Successfully",
        data: deleteDivision,
    })

    })

export const DivisionControllers={
   createDivison,
   getAllDivision,
   getSingleDivision,
   updateDivision,
   deleteDivision
}