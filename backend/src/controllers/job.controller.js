import { NotFoundError, ValidationError } from '../utils/errors.js';
import jobService from '../services/job.service.js';

// Create a new job
const createJob = async (req, res) => {
  try {
    const jobData = req.body;
    const adminId = req.user.id; // Assuming user is authenticated and ID is available
    const job = await jobService.createJob(jobData, adminId);
    return res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Get all jobs with optional filters
const getAllJobs = async (req, res) => {
  try {
    const { searchQuery, category, limit = '10', page = '1' } = req.query;
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const offset = (parsedPage - 1) * parsedLimit;

    const result = await jobService.getAllJobs({
      searchQuery,
      category,
      limit: parsedLimit,
      offset,
    });

    return res.status(200).json({
      success: true,
      data: result.jobs,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Get a single job by ID
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await jobService.getJobById(id);
    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Update a job (full update)
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const jobData = req.body;
    const job = await jobService.updateJob(id, jobData);
    return res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: job,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Update a job partially
const updateJobPartial = async (req, res) => {
  try {
    const { id } = req.params;
    const jobData = req.body;
    const job = await jobService.updateJobPartial(id, jobData);
    return res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: job,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Toggle job status
const toggleJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await jobService.toggleJobStatus(id);
    return res.status(200).json({
      success: true,
      message: `Job status set to ${job.isActive ? 'active' : 'inactive'}`,
      data: job,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await jobService.deleteJob(id);
    return res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  updateJobPartial,
  toggleJobStatus,
  deleteJob,
};