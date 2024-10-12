import { Router } from "express";
import GroupController from "../controllers/GroupController.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import ChatGroupUserController from "../controllers/ChatGroupUserController.js";
import ChatsController from "../controllers/ChatsController.js";

const router = Router();

router.post("/chat-group", authMiddleware, GroupController.store);

router.get("/chat-group", authMiddleware, GroupController.index);

router.get("/chat-group/:id", GroupController.show);

router.put("/chat-group/:id", authMiddleware, GroupController.update);

router.delete("/chat-group/:id", authMiddleware, GroupController.destroy);

router.get("/chat-group-users", authMiddleware, ChatGroupUserController.index);
router.post("/chat-group-users", authMiddleware, ChatGroupUserController.store);

// * Chats
router.get("/chats/:groupId", ChatsController.index);

export default router;