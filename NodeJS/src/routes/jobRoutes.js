import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createJob)
  .get(getJobs);

router.route('/:id')
  .get(getJob)
  .put(updateJob)
  .delete(deleteJob);

export default router;