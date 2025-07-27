import z from "zod";


export const createDivisonSchema=z.object({
        name:z.string({error:"Name must be string"})
        .min(1,{message:"Name Too short minimum 1 character long"}),
        thumbnail:z.string().optional(),
        description:z.string({error:"Description must be string"}).optional()
})  

export const updateDivisionSchema=z.object({
        name:z.string({error:"Name must be string"})
        .min(1,{message:"Name Too short minimum 1 character long"}),
        thumbnail:z.string().optional(),
        description:z.string({error:"Description must be string"}).optional()
})