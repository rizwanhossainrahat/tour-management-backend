import { Router } from "express";
import { DivisionControllers } from "./division.contorller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { createDivisonSchema, updateDivisionSchema } from "./division.validations";
import { validateRequest } from "../../middlewares/validateRequest";


const router=Router()

router.post("/create", 
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(createDivisonSchema),DivisionControllers.createDivison)

router.get("/",DivisionControllers.getAllDivision)

router.get("/:slug",DivisionControllers.getSingleDivision)
router.patch("/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),validateRequest(updateDivisionSchema),DivisionControllers.updateDivision)

router.delete("/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),DivisionControllers.deleteDivision)

export const DivisionRoutes = router