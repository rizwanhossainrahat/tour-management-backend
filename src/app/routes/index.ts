import { Router } from "express";
import { UserRouters } from "../modules/user/user.router";
import { AuthRoutes } from "../modules/auth/auth.route";


export const router=Router()

const moduleRouter=[
    {
        path:"/user",
        route:UserRouters
    },
    {
        path:"/auth",
        route:AuthRoutes,
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