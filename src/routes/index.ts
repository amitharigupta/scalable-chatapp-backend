import { Router } from "express";
import authRouteApi from "./auth.routes.js";

const router = Router();

router.post('/auth', authRouteApi);

export default router;