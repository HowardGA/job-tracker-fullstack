import { Router } from "express";
import { authenticate } from "../middleware/authHandler";
import { CreateJob, deleteJob, getJob, getJobs, updateJob } from "../controllers/jobController";

const router = Router();

router.post('/', authenticate, CreateJob);
router.get('/', getJobs);
router.get('/:id', getJob);
router.delete('/:id', authenticate, deleteJob);
router.patch('/:id', authenticate, updateJob);

export default router;
