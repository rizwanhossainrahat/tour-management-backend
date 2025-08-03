import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { TourServices } from "./tour.service";
import { ITour } from "./tour.interface";



// Tour 
const createTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const payload: ITour = {
        ...req.body,
        images: (req.files as Express.Multer.File[]).map(file => file.path)
    }
  const tour=await TourServices.createTour(payload)

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Tour  Created Successfully",
        data: tour,
    })

    })

const getAllTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const query=req.query;
  const tour=await TourServices.getAllTour(query as Record<string,string>)  

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Tour  retrived Successfully",
        data: tour.data,
        meta:tour.meta
    })

    })

const updateTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const tourId=req.params.id;
      const payload: ITour = {
        ...req.body,
        images: (req.files as Express.Multer.File[]).map(file => file.path)
    }
    const updatedTour=await TourServices.updateTour(tourId,payload)

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Tour updated Successfully",
        data: updatedTour,
    })

    })

const deleteTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const tourId=req.params.id;
    const tour=await TourServices.deleteTour(tourId)

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Tour deleted Successfully",
        data: null,
    })

    })

//tour type
const createTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tour=await TourServices.createTourType(req.body)

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Tour Type Created Successfully",
        data: tour,
    })

    })

const getAllTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tourType=await TourServices.getAllTourType()

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Tour Type retrived Successfully",
        data: tourType,
    })

    })

const updateTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const tourTypeId=req.params.id;
    const updatedTourtype=await TourServices.updateTourType(tourTypeId,req.body)

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Tour Type updated Successfully",
        data: updatedTourtype,
    })

    })

const deleteTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const tourTypeId=req.params.id;
    const deleteTourtype=await TourServices.deleteTourType(tourTypeId)

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Tour Type deleted Successfully",
        data: null,
    })

    })

export const TourControllers={
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,

    createTour,
    getAllTour,
    updateTour,
    deleteTour
}