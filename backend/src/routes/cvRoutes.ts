import { Router } from 'express';
import { authenticate } from '../middleware/authHandler';
import { handleCVUpload, handleGetCV, handleReplace } from '../controllers/cvController';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024}
});

const router = Router();

router.post('/', authenticate, upload.single('cv'),handleCVUpload);
router.get('/', authenticate, handleGetCV);
router.put('/', authenticate, upload.single('cv'), handleReplace);

export default router;