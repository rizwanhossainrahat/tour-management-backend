import { Router } from "express";
import { TourControllers } from "./tour.controller";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { createTourTypeZodSchema, createTourZodSchema, updateTourZodSchema } from "./tour.validation";
import { multerUpload } from "../../config/multer.config";


const router=Router()

//Tour Api
router.post("/create",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.array("files"),
    validateRequest(createTourZodSchema),
    TourControllers.createTour)

router.get("/",TourControllers.getAllTour)

router.patch("/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
     multerUpload.array("files"),
    validateRequest(updateTourZodSchema),TourControllers.updateTour)
router.delete("/:id",checkAuth(Role.ADMIN, Role.SUPER_ADMIN),TourControllers.deleteTour)


// Tour type route
router.post("/create-tour-type",checkAuth(Role.ADMIN, Role.SUPER_ADMIN),validateRequest(createTourTypeZodSchema),TourControllers.createTourType)
router.get("/tour-types",TourControllers.getAllTourType)
router.patch("/tour-types/:id",checkAuth(Role.ADMIN, Role.SUPER_ADMIN),validateRequest(createTourTypeZodSchema),TourControllers.updateTourType)
router.delete("/tour-types/:id",checkAuth(Role.ADMIN, Role.SUPER_ADMIN),validateRequest(createTourTypeZodSchema),TourControllers.deleteTourType)

export const TourRoutes = router