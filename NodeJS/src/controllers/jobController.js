import Job from '../models/Job.js';

export const createJob = async (req, res) => {
  try {
    const { title, company, description, skillsRequired } = req.body;
    const job = await Job.create({
      userId: req.user.id,
      title,
      company,
      description,
      skillsRequired
    });

    res.status(201).json({
      status: 'success',
      data: { job }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id });
    res.status(200).json({
      status: 'success',
      data: { jobs }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { job }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { job }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};