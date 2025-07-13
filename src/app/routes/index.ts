import { Router } from "express";
import { UserRouters } from "../modules/user/user.router";


export const router=Router()

const moduleRouter=[
    {
        path:"/user",
        route:UserRouters
    }
]

moduleRouter.forEach((route)=>{
    router.use(route.path,route.route)
})

// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)