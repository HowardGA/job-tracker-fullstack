import { Router } from "express";
import { authenticate } from "../middleware/authHandler";
import { getUserInfo } from "../controllers/userController";

const router = Router();

router.get('/', authenticate, getUserInfo);

export default router;