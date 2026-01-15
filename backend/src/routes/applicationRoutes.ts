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

router.post('/:jobId', authenticate, submitApplication);
router.get('/candidate/:status?', authenticate, getCandidateApplications);
router.get('/candidate/single/:jobId', authenticate, getCandidateApplicationByJob);
router.get('/employer/:jobId', authenticate, getCandidatesApplicationsByjob);
router.patch('/changeStatus/:candidateId/:jobId', authenticate, updateApplicationStatus);
router.delete('/withdraw/:jobId', authenticate, withdraw);

export default router;