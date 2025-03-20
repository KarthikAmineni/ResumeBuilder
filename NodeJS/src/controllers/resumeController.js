import Resume from '../models/Resume.js';
import { optimizeResume } from '../utils/aiService.js';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return {
      bucketName: 'resumes',
      filename: `${Date.now()}-${file.originalname}`
    };
  }
});

export const upload = multer({ storage });

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    const resume = await Resume.create({
      userId: req.user.id,
      title: req.body.title || req.file.originalname,
      fileId: req.file.id,
      originalFileName: req.file.originalname,
      fileType: req.file.mimetype,
      source: 'local'
    });

    res.status(201).json({
      status: 'success',
      data: { resume }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.status(200).json({
      status: 'success',
      data: { resumes }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getResume = async (req, res) => {
  try {
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'resumes'
    });

    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!resume) {
      return res.status(404).json({
        status: 'error',
        message: 'Resume not found'
      });
    }

    res.set('Content-Type', resume.fileType);
    bucket.openDownloadStream(new mongoose.Types.ObjectId(resume.fileId)).pipe(res);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const optimizeResumeForJob = async (req, res) => {
  try {
    const { resumeId, jobId } = req.params;
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.user.id
    });
    const job = await Job.findOne({
      _id: jobId,
      userId: req.user.id
    });

    if (!resume || !job) {
      return res.status(404).json({
        status: 'error',
        message: 'Resume or job not found'
      });
    }

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'resumes'
    });

    const resumeContent = await new Promise((resolve, reject) => {
      let content = '';
      bucket.openDownloadStream(new mongoose.Types.ObjectId(resume.fileId))
        .on('data', chunk => content += chunk)
        .on('error', reject)
        .on('end', () => resolve(content));
    });

    const optimizedContent = await optimizeResume(resumeContent, job.description);

    const uploadStream = bucket.openUploadStream(`optimized-${Date.now()}-${resume.originalFileName}`);
    uploadStream.write(optimizedContent);
    uploadStream.end();

    const optimizedFileId = uploadStream.id;

    resume.optimizedVersions.push({
      jobId: job._id,
      fileId: optimizedFileId
    });
    await resume.save();

    res.status(200).json({
      status: 'success',
      data: { resume }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};