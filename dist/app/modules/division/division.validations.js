"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDivisionSchema = exports.createDivisonSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createDivisonSchema = zod_1.default.object({
    name: zod_1.default.string({ error: "Name must be string" })
        .min(1, { message: "Name Too short minimum 1 character long" }),
    thumbnail: zod_1.default.string().optional(),
    description: zod_1.default.string({ error: "Description must be string" }).optional()
});
exports.updateDivisionSchema = zod_1.default.object({
    name: zod_1.default.string({ error: "Name must be string" })
        .min(1, { message: "Name Too short minimum 1 character long" }).optional(),
    thumbnail: zod_1.default.string().optional(),
    description: zod_1.default.string({ error: "Description must be string" }).optional()
});
