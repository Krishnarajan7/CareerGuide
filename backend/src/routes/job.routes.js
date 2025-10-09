import express from 'express';
import jobController from '../controllers/job.controller.js';
import { authenticate, authorizeAdmin, validateJobId } from '../middlewares/job.middleware.js';

const router = express.Router();

router.post('/', authenticate, authorizeAdmin, jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/:id', validateJobId, jobController.getJobById);
router.put('/:id', authenticate, authorizeAdmin, validateJobId, jobController.updateJob);
router.patch('/:id', authenticate, authorizeAdmin, validateJobId, jobController.updateJobPartial);
router.patch('/:id/status', authenticate, authorizeAdmin, validateJobId, jobController.toggleJobStatus);
router.delete('/:id', authenticate, authorizeAdmin, validateJobId, jobController.deleteJob);

export default router;