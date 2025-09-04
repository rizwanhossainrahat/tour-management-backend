import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";
import { excludeField } from "../../constant";
import { QueryBuilder } from "../../utils/queryBuilder";
import { tourSearchAbleFields, tourTypeSearchableFields } from "./tour.constant";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";


const createTour=async(payload:ITour)=>{
   const existingTour = await Tour.findOne({ title: payload.title });
   
   
    if(existingTour){
          throw new Error("Tour  already exists.");
    }

//    const baseSlug = payload.title.toLowerCase().split(" ").join("-")
//     let slug = `${baseSlug}`

//     let counter = 0;
//     while (await Tour.exists({ slug })) {
//         slug = `${slug}-${counter++}` 
//     }

//     payload.slug = slug;

    const tour=await Tour.create(payload)
    return tour

   
}

const getAllTour=async(query:Record<string,string>)=>{

  const queryBuilder = new QueryBuilder(Tour.find(), query)

    const tours = await queryBuilder
        .search(tourSearchAbleFields)
        .filter()
        .sort()
        .fields()
        .paginate()

    // const meta = await queryBuilder.getMeta()

    const [data, meta] = await Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ])
       
      return {
        data,
        meta
    }
}

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

const updateTour=async(id:string,payload:ITour)=>{
   const existingTour = await Tour.findById(id);
   if(!existingTour){
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
        payload.images = [...payload.images, ...existingTour.images]
    }

    if (payload.deleteImages && payload.deleteImages.length > 0 && existingTour.images && existingTour.images.length > 0) {

        const restDBImages = existingTour.images.filter(imageUrl => !payload.deleteImages?.includes(imageUrl))

        const updatedPayloadImages = (payload.images || [])
            .filter(imageUrl => !payload.deleteImages?.includes(imageUrl))
            .filter(imageUrl => !restDBImages.includes(imageUrl))

        payload.images = [...restDBImages, ...updatedPayloadImages]


    }

    const updatedTour=await Tour.findByIdAndUpdate(id,payload,{new:true})

    if (payload.deleteImages && payload.deleteImages.length > 0 && existingTour.images && existingTour.images.length > 0) {
        await Promise.all(payload.deleteImages.map(url => deleteImageFromCLoudinary(url)))
    }

    return updateTour
}

const deleteTour=async(id:string)=>{
   return await Tour.findByIdAndDelete(id)
}



// Tour Type
const createTourType=async(payload:ITourType)=>{
    const existingTourType=await TourType.findOne({name:payload.name})
    if(existingTourType){
          throw new Error("Tour type already exists.");
    }
    const tourType=await TourType.create(payload)
    return tourType
}

const getAllTourType=async(query:Record<string,string>)=>{
  
    const queryBuilder = new QueryBuilder(TourType.find(), query)

    const tourTypes = await queryBuilder
        .search(tourTypeSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate()

    const [data, meta] = await Promise.all([
        tourTypes.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }

}

// const getAllTourType=async()=>{
  
//     const tourType=await TourType.find({})
   
//     return tourType
// }

const updateTourType=async(id:string,payload:ITourType)=>{
    const existingTourType=await TourType.findById(id);
     if (!existingTourType) {
        throw new Error("Tour type not found.");
    }

    const updateTourType=await TourType.findByIdAndUpdate(id,payload,{new:true})
   
    return updateTourType
}

const deleteTourType=async(id:string)=>{
    return  await TourType.findByIdAndDelete(id)
}

export const TourServices={
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,

    createTour,
    getAllTour,
    updateTour,
    deleteTour

}