import { Router } from "express";
import authRouteApi from "./auth.routes.js";
import chatGroupRouteApi from "./chatgroup.routes.js";

const router = Router();

router.use('/auth', authRouteApi);

// chat group routes
router.use('/chat', chatGroupRouteApi);

export default router;