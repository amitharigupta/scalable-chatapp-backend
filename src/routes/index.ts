import { Router } from "express";
import authRouteApi from "./auth.routes.js";
import chatGroupRouteApi from "./chatgroup.routes.js";
import authMiddleware  from "../middlewares/AuthMiddleware.js";

const router = Router();

router.use('/auth', authRouteApi);

// chat group routes
router.use('/chat', authMiddleware, chatGroupRouteApi);

export default router;