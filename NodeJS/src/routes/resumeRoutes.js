import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  uploadResume,
  getResumes,
  getResume,
  optimizeResumeForJob,
  upload
} from '../controllers/resumeController.js';

const router = express.Router();

router.use(protect);

router.post('/upload', upload.single('resume'), uploadResume);
router.get('/', getResumes);
router.get('/:id', getResume);
router.post('/:resumeId/optimize/:jobId', optimizeResumeForJob);

export default router;