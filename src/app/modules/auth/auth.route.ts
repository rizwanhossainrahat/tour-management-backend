import { Router } from "express";
import { AuthControlles } from "./auth.controller";

const router=Router()
router.post("/login",AuthControlles.credentialsLogin)

export const AuthRoutes=router