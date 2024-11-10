import express from "express";
import { getCurrentUser,sendMessage ,getMessages} from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/chat", protectRoute, getCurrentUser);
router.get("/getmessages/:username", protectRoute, getMessages);
router.post("/sendmessages", protectRoute, sendMessage);

export default router;
