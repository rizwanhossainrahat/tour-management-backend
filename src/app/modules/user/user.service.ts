import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import { StatusCodes} from "http-status-codes"
import bcryptjs from "bcryptjs"
import AppError from "../../errorHelpers/AppError";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import { userSearchableFields } from "./user.constant";
import { QueryBuilder } from "../../utils/queryBuilder";


const createUser=async(payload:Partial<IUser>)=>{
        const {email,password,...rest}=payload
        const isUserExist=await User.findOne({email})
        
        // if(isUserExist){
        //     throw new AppError(StatusCodes.BAD_REQUEST,"User already exists")
        // }

        const hashPassword=await bcryptjs.hash(password as string,Number(envVars.BCRYPT_SALT_ROUND) )

        const authProvider:IAuthProvider={provider:"credentials",providerId:email as string}
        const user=await User.create({ 
                       email,
                       password:hashPassword,
                       auths:[authProvider], 
                       ...rest
 })
 return user
}

const updateUser=async(userId:string,payload:Partial<IUser>,decodedToken:JwtPayload)=>{


    if(payload.role){
        if(decodedToken.role===Role.USER || decodedToken.role ===Role.GUIDE){
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }

    if(payload.role ===Role.SUPER_ADMIN && decodedToken.role===Role.ADMIN){
          throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

     if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }

       if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, envVars.BCRYPT_SALT_ROUND)
    }
     const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

    return newUpdatedUser
}

const getAllUsers = async (query: Record<string, string>) => {
    // const users = await User.find({});
    // const totalUsers = await User.countDocuments();

     const queryBuilder = new QueryBuilder(User.find(), query)
    const usersData = queryBuilder
        .filter()
        .search(userSearchableFields)
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        usersData.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
}

export const userServices={
    createUser,
    getAllUsers,
    updateUser
}