"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse_1 = require("../../utils/sendResponse");
const catchAsync_1 = require("../../utils/catchAsync");
const tour_service_1 = require("./tour.service");
// Tour 
const createTour = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = Object.assign(Object.assign({}, req.body), { images: req.files.map(file => file.path) });
    const tour = yield tour_service_1.TourServices.createTour(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Tour  Created Successfully",
        data: tour,
    });
}));
const getAllTour = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const tour = yield tour_service_1.TourServices.getAllTour(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Tour  retrived Successfully",
        data: tour.data,
        meta: tour.meta
    });
}));
const updateTour = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tourId = req.params.id;
    const payload = Object.assign(Object.assign({}, req.body), { images: req.files.map(file => file.path) });
    const updatedTour = yield tour_service_1.TourServices.updateTour(tourId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Tour updated Successfully",
        data: updatedTour,
    });
}));
const deleteTour = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tourId = req.params.id;
    const tour = yield tour_service_1.TourServices.deleteTour(tourId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Tour deleted Successfully",
        data: null,
    });
}));
//tour type
const createTourType = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = yield tour_service_1.TourServices.createTourType(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Tour Type Created Successfully",
        data: tour,
    });
}));
const getAllTourType = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tourType = yield tour_service_1.TourServices.getAllTourType();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Tour Type retrived Successfully",
        data: tourType,
    });
}));
const updateTourType = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tourTypeId = req.params.id;
    const updatedTourtype = yield tour_service_1.TourServices.updateTourType(tourTypeId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Tour Type updated Successfully",
        data: updatedTourtype,
    });
}));
const deleteTourType = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tourTypeId = req.params.id;
    const deleteTourtype = yield tour_service_1.TourServices.deleteTourType(tourTypeId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Tour Type deleted Successfully",
        data: null,
    });
}));
exports.TourControllers = {
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,
    createTour,
    getAllTour,
    updateTour,
    deleteTour
};
