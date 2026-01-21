import { Router } from "express";
import { authenticate } from "../middleware/authHandler";
import { CreateJob, deleteJob, getJob, getJobs, getMyJobs, updateJob, findJobWithApplicants, changeVisibility } from "../controllers/jobController";

const router = Router();

router.get('/', getJobs);
router.get('/my-jobs', authenticate, getMyJobs);
router.get('/applications/:jobId', authenticate, findJobWithApplicants); 
router.get('/:id', getJob);
router.post('/', authenticate, CreateJob);
router.delete('/:id', authenticate, deleteJob);
router.patch('/:id', authenticate, updateJob);
router.patch('/toggleVisibility/:jobId', authenticate, changeVisibility);

export default router;
