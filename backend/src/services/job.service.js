import { prisma } from '../config/prisma.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';
import { validateJobInput, validatePartialJobInput } from '../validations/job.validation.js';

const createJob = async (jobData, adminId) => {
  try {
    const validatedData = validateJobInput(jobData);
    const job = await prisma.job.create({
      data: {
        ...validatedData,
        postedById: adminId,
        createdAt: new Date(),
      },
    });
    return job;
  } catch (error) {
    throw new ValidationError(`Failed to create job: ${error.message}`);
  }
};

const getAllJobs = async ({ searchQuery = '', category = 'All', limit = 10, offset = 0 }) => {
  try {
    const where = {};
    if (searchQuery) {
      where.OR = [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { company: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }
    if (category !== 'All') {
      where.category = category;
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { postedBy: { select: { name: true, email: true } } },
      }),
      prisma.job.count({ where }),
    ]);

    return { jobs, total, page: Math.floor(offset / limit) + 1, limit };
  } catch (error) {
    throw new Error(`Failed to fetch jobs: ${error.message}`);
  }
};

const getJobById = async (jobId) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(jobId) },
      include: { postedBy: { select: { name: true, email: true } } },
    });
    if (!job) {
      throw new NotFoundError(`Job with ID ${jobId} not found`);
    }
    return job;
  } catch (error) {
    throw error instanceof NotFoundError ? error : new Error(`Failed to fetch job: ${error.message}`);
  }
};

const updateJob = async (jobId, jobData) => {
  try {
    const validatedData = validateJobInput(jobData);
    const job = await prisma.job.update({
      where: { id: parseInt(jobId) },
      data: validatedData,
    });
    return job;
  } catch (error) {
    if (error.code === 'P2025') {
      throw new NotFoundError(`Job with ID ${jobId} not found`);
    }
    throw new ValidationError(`Failed to update job: ${error.message}`);
  }
};

const updateJobPartial = async (jobId, jobData) => {
  try {
    const validatedData = validatePartialJobInput(jobData);
    const job = await prisma.job.update({
      where: { id: parseInt(jobId) },
      data: validatedData,
    });
    return job;
  } catch (error) {
    if (error.code === 'P2025') {
      throw new NotFoundError(`Job with ID ${jobId} not found`);
    }
    throw new ValidationError(`Failed to update job: ${error.message}`);
  }
};

const toggleJobStatus = async (jobId) => {
  try {
    const job = await prisma.job.update({
      where: { id: parseInt(jobId) },
      data: {
        isActive: { set: prisma.job.fields.isActive.not() },
      },
      select: {
        id: true,
        isActive: true,
      },
    });
    return job;
  } catch (error) {
    if (error.code === 'P2025') {
      throw new NotFoundError(`Job with ID ${jobId} not found`);
    }
    throw new Error(`Failed to toggle job status: ${error.message}`);
  }
};

const deleteJob = async (jobId) => {
  try {
    await prisma.job.delete({
      where: { id: parseInt(jobId) },
    });
    return { message: 'Job deleted successfully' };
  } catch (error) {
    if (error.code === 'P2025') {
      throw new NotFoundError(`Job with ID ${jobId} not found`);
    }
    throw new Error(`Failed to delete job: ${error.message}`);
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