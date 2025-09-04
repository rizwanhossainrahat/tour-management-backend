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
exports.DivisionControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const division_service_1 = require("./division.service");
const createDivison = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = Object.assign(Object.assign({}, req.body), { thumbnail: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
    const division = yield division_service_1.DivisonServices.createDivison(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Division Created Successfully",
        data: division,
    });
}));
const getAllDivision = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const division = yield division_service_1.DivisonServices.getAllDivision(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.ACCEPTED,
        message: "All Division retreived Successfully",
        data: division,
    });
}));
// const getAllDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const division = await DivisonServices.getAllDivision()
//       sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.ACCEPTED,
//         message: "All Division retreived Successfully",
//         data: division,
//     })
//     })
const getSingleDivision = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const division = yield division_service_1.DivisonServices.getSingleDivision(slug);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.ACCEPTED,
        message: " Division retreived Successfully",
        data: division,
    });
}));
const updateDivision = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const payload = Object.assign(Object.assign({}, req.body), { thumbnail: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
    const division = yield division_service_1.DivisonServices.updateDivision(id, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.ACCEPTED,
        message: " Division updated Successfully",
        data: division,
    });
}));
const deleteDivision = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deleteDivision = yield division_service_1.DivisonServices.deleteDivision(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.ACCEPTED,
        message: " Division deleted Successfully",
        data: deleteDivision,
    });
}));
exports.DivisionControllers = {
    createDivison,
    getAllDivision,
    getSingleDivision,
    updateDivision,
    deleteDivision
};
