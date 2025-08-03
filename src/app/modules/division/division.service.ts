import { NextFunction, Request, Response } from "express";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import { divisionSearchableFields } from "./division.constant";
import { QueryBuilder } from "../../utils/queryBuilder";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";


const createDivison=async(payload:IDivision)=>{

    const existingDivison=await Division.findOne({name:payload.name})
    
    if(existingDivison){
        throw new Error("A division with this name already exists.")
    }
    
    // const baseSlug = payload.name.toLowerCase().split(" ").join("-")
    // let slug = `${baseSlug}-division`

    // let counter = 0;
    // while (await Division.exists({ slug })) {
    //     slug = `${slug}-${counter++}` 
    // }

    // payload.slug = slug;
     
        const division=await Division.create(payload)
        return division
}

const getAllDivision=async(query: Record<string, string>)=>{
        const queryBuilder = new QueryBuilder(Division.find(), query)

    const divisionsData = queryBuilder
        .search(divisionSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate()

    const [data, meta] = await Promise.all([
        divisionsData.build(),
        queryBuilder.getMeta()
    ])
        return {
            data,
            meta 
        }
}

// const getAllDivision=async()=>{
//         const division=await Division.find({})
//         const totalDivision=await Division.countDocuments();
//         return {
//             data:division,
//             meta:{
//                 total:totalDivision
//             }
//         }
// }
const getSingleDivision=async(slug:string)=>{
        const division=await Division.findOne({slug})
       
        return {
            data:division,
        }
}

const updateDivision=async(id:string,payload:Partial<IDivision>)=>{
        const existingDivison=await Division.findById(id)
        if(!existingDivison){
            throw new Error("Division not found")
        }
        const duplicateDivision=await Division.findOne({
            name:payload.name,
            _id:{$ne:id}
        })

         if (duplicateDivision) {
        throw new Error("A division with this name already exists.");
    }

    // const baseSlug = payload.name.toLowerCase().split(" ").join("-")
    // let slug = `${baseSlug}-division`

    // let counter = 0;
    // while (await Division.exists({ slug })) {
    //     slug = `${slug}-${counter++}` 
    // }

    // payload.slug = slug;

    const updateDivision=await Division.findByIdAndUpdate(id,payload,{new:true,runValidators:true})

    if(payload.thumbnail && existingDivison.thumbnail){
        await deleteImageFromCLoudinary(existingDivison.thumbnail)
    }

    return updateDivision;
}
const deleteDivision=async(id:string)=>{
       await Division.findByIdAndDelete(id)
       return null
}



export const DivisonServices={
    createDivison,
    getAllDivision,
    getSingleDivision,
    updateDivision,
    deleteDivision
} 