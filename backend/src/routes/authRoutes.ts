import { Router } from "express";
import { register, login, logout, currentUser } from '../controllers/authController';
import { authenticate } from "../middleware/authHandler";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/current-user', authenticate,currentUser);

export default router;
