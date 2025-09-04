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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourServices = void 0;
const cloudinary_config_1 = require("../../config/cloudinary.config");
const queryBuilder_1 = require("../../utils/queryBuilder");
const tour_constant_1 = require("./tour.constant");
const tour_model_1 = require("./tour.model");
const createTour = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTour = yield tour_model_1.Tour.findOne({ title: payload.title });
    if (existingTour) {
        throw new Error("Tour  already exists.");
    }
    //    const baseSlug = payload.title.toLowerCase().split(" ").join("-")
    //     let slug = `${baseSlug}`
    //     let counter = 0;
    //     while (await Tour.exists({ slug })) {
    //         slug = `${slug}-${counter++}` 
    //     }
    //     payload.slug = slug;
    const tour = yield tour_model_1.Tour.create(payload);
    return tour;
});
const getAllTour = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBuilder_1.QueryBuilder(tour_model_1.Tour.find(), query);
    const tours = yield queryBuilder
        .search(tour_constant_1.tourSearchAbleFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    // const meta = await queryBuilder.getMeta()
    const [data, meta] = yield Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
});
// const getAllTour=async(query:Record<string,string>)=>{
//     const filter=query;
//     const searchTerm=query.searchTerm || "";
//     const sort=query.sort || "-createdAt"
//     const page=Number(query.skip) || 1;
//     const limit=Number(query.limit) || 10;
//     const skip=(page-1)*limit;
//     //field fitlering
//      const fields = query.fields?.split(",").join(" ") || ""
//     // delete filter["searchTerm"]
//       for (const field of excludeField) {
//         delete filter[field]
//     }
//     const searchQuery = {
//         $or: tourSearchAbleFields.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))
//     }
// //    const tours = await Tour.find(searchQuery).find(filter).sort(sort).select(fields).skip(skip).limit(limit);
//      const filterQuery = Tour.find(filter)
//      const tours = filterQuery.find(searchQuery)
//      const allTours = await tours.sort(sort).select(fields).skip(skip).limit(limit)
//    const totalTours= await Tour.countDocuments()
//    const totalPage=Math.ceil(totalTours/10)
//       const meta = {
//         page: page,
//         limit: limit,
//         total: totalTours,
//         totalPage: totalPage,
//     }
//       return {
//         data: allTours,
//         meta: meta
//     }
// }
const updateTour = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTour = yield tour_model_1.Tour.findById(id);
    if (!existingTour) {
        throw new Error("Tour  is not exists.");
    }
    //  const baseSlug = payload.title.toLowerCase().split(" ").join("-")
    // let slug = `${baseSlug}`
    // let counter = 0;
    // while (await Tour.exists({ slug })) {
    //     slug = `${slug}-${counter++}` 
    // }
    // payload.slug = slug; 
    if (payload.images && payload.images.length > 0 && existingTour.images && existingTour.images.length > 0) {
        payload.images = [...payload.images, ...existingTour.images];
    }
    if (payload.deleteImages && payload.deleteImages.length > 0 && existingTour.images && existingTour.images.length > 0) {
        const restDBImages = existingTour.images.filter(imageUrl => { var _a; return !((_a = payload.deleteImages) === null || _a === void 0 ? void 0 : _a.includes(imageUrl)); });
        const updatedPayloadImages = (payload.images || [])
            .filter(imageUrl => { var _a; return !((_a = payload.deleteImages) === null || _a === void 0 ? void 0 : _a.includes(imageUrl)); })
            .filter(imageUrl => !restDBImages.includes(imageUrl));
        payload.images = [...restDBImages, ...updatedPayloadImages];
    }
    const updatedTour = yield tour_model_1.Tour.findByIdAndUpdate(id, payload, { new: true });
    if (payload.deleteImages && payload.deleteImages.length > 0 && existingTour.images && existingTour.images.length > 0) {
        yield Promise.all(payload.deleteImages.map(url => (0, cloudinary_config_1.deleteImageFromCLoudinary)(url)));
    }
    return updateTour;
});
const deleteTour = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_model_1.Tour.findByIdAndDelete(id);
});
// Tour Type
const createTourType = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTourType = yield tour_model_1.TourType.findOne({ name: payload.name });
    if (existingTourType) {
        throw new Error("Tour type already exists.");
    }
    const tourType = yield tour_model_1.TourType.create(payload);
    return tourType;
});
const getAllTourType = () => __awaiter(void 0, void 0, void 0, function* () {
    const tourType = yield tour_model_1.TourType.find({});
    return tourType;
});
const updateTourType = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTourType = yield tour_model_1.TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }
    const updateTourType = yield tour_model_1.TourType.findByIdAndUpdate(id, payload, { new: true });
    return updateTourType;
});
const deleteTourType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_model_1.TourType.findByIdAndDelete(id);
});
exports.TourServices = {
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,
    createTour,
    getAllTour,
    updateTour,
    deleteTour
};
