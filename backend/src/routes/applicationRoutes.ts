import Router from 'express';
import { authenticate } from '../middleware/authHandler';
import { 
    getCandidateApplications, 
    submitApplication, 
    getCandidateApplicationByJob, 
    getCandidatesApplicationsByjob, 
    updateApplicationStatus,
    withdraw
 } from '../controllers/applicationController';

const router = Router();

router.get('/candidate/:status?', authenticate, getCandidateApplications);
router.get('/candidate/single/:jobId', authenticate, getCandidateApplicationByJob);
router.get('/employer/:jobId', authenticate, getCandidatesApplicationsByjob);
router.post('/:jobId', authenticate, submitApplication);
router.patch('/:id/status', authenticate, updateApplicationStatus);
router.delete('/withdraw/:jobId', authenticate, withdraw);

export default router;