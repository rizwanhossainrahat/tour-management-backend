import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";
import { otpServices } from "./otp.service";

const sendOTP = catchAsync(async (req: Request, res: Response) => {
    const { email, name } = req.body
    await otpServices.sendOTP(email, name)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "OTP sent successfully",
        data: null,
    });
})
const verifyOtp = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body
    await otpServices.verifyOtp(email, otp)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "OTP verified successfully",
        data: null,
    });
})

export const otpControllers={
    sendOTP,
    verifyOtp
}