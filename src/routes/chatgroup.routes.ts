import { Router } from "express";
import GroupController from "../controllers/GroupController.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post('/chat-group', GroupController.store);

router.get("/chat-group", GroupController.index);

router.get("/chat-group/:id", GroupController.show);

router.get("/chat-group/:id", GroupController.update);

router.get("/chat-group/:id", GroupController.destroy);

export default  router;