import { Router } from "express";
import {
  allMessages,
  sendMessage,
} from "../controllers/messsageControllers.js";
import { protect } from "../middileware/authMiddleware.js";

const router = Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

export default router;
