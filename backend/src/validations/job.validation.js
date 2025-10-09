import Joi from 'joi';

// Defining allowed enum values based on Prisma schema
const jobTypes = ['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT'];
const jobCategories = ['ENGINEERING', 'MANAGEMENT', 'DESIGN', 'MARKETING', 'SALES', 'DATA_SCIENCE', 'PRODUCT'];
const experienceLevels = ['FRESHER', 'ZERO_TO_ONE', 'ONE_TO_THREE', 'THREE_TO_FIVE'];

// Validation schema for full job creation/update
const jobSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(256)
    .required()
    .messages({
      'string.base': 'Job title must be a string',
      'string.empty': 'Job title is required',
      'string.min': 'Job title must be at least 3 characters long',
      'string.max': 'Job title cannot exceed 256 characters',
    }),
  company: Joi.string()
    .trim()
    .min(2)
    .max(256)
    .required()
    .messages({
      'string.base': 'Company name must be a string',
      'string.empty': 'Company name is required',
      'string.min': 'Company name must be at least 2 characters long',
      'string.max': 'Company name cannot exceed 256 characters',
    }),
  location: Joi.string()
    .trim()
    .min(2)
    .max(128)
    .required()
    .messages({
      'string.base': 'Location must be a string',
      'string.empty': 'Location is required',
      'string.min': 'Location must be at least 2 characters long',
      'string.max': 'Location cannot exceed 128 characters',
    }),
  type: Joi.string()
    .valid(...jobTypes)
    .required()
    .messages({
      'any.only': `Job type must be one of: ${jobTypes.join(', ')}`,
      'string.empty': 'Job type is required',
    }),
  category: Joi.string()
    .valid(...jobCategories)
    .required()
    .messages({
      'any.only': `Job category must be one of: ${jobCategories.join(', ')}`,
      'string.empty': 'Job category is required',
    }),
  experience: Joi.string()
    .valid(...experienceLevels)
    .required()
    .messages({
      'any.only': `Experience level must be one of: ${experienceLevels.join(', ')}`,
      'string.empty': 'Experience level is required',
    }),
  minSalary: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'Minimum salary must be a number',
      'number.integer': 'Minimum salary must be an integer',
      'number.min': 'Minimum salary cannot be negative',
      'any.required': 'Minimum salary is required',
    }),
  maxSalary: Joi.number()
    .integer()
    .min(Joi.ref('minSalary'))
    .required()
    .messages({
      'number.base': 'Maximum salary must be a number',
      'number.integer': 'Maximum salary must be an integer',
      'number.min': 'Maximum salary must be greater than or equal to minimum salary',
      'any.required': 'Maximum salary is required',
    }),
  description: Joi.string()
    .trim()
    .min(10)
    .required()
    .messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 10 characters long',
    }),
  requirements: Joi.array()
    .items(Joi.string().trim().min(1))
    .min(1)
    .required()
    .messages({
      'array.base': 'Requirements must be an array of strings',
      'array.min': 'At least one requirement is required',
      'string.empty': 'Requirements cannot contain empty strings',
      'any.required': 'Requirements are required',
    }),
  benefits: Joi.array()
    .items(Joi.string().trim().min(1))
    .min(0)
    .required()
    .messages({
      'array.base': 'Benefits must be an array of strings',
      'string.empty': 'Benefits cannot contain empty strings',
      'any.required': 'Benefits are required',
    }),
  skills: Joi.array()
    .items(Joi.string().trim().min(1))
    .min(0)
    .required()
    .messages({
      'array.base': 'Skills must be an array of strings',
      'string.empty': 'Skills cannot contain empty strings',
      'any.required': 'Skills are required',
    }),
  applicationDeadline: Joi.date()
    .iso()
    .min('now')
    .required()
    .messages({
      'date.base': 'Application deadline must be a valid ISO date',
      'date.min': 'Application deadline must be in the future',
      'any.required': 'Application deadline is required',
    }),
});

// Validation schema for partial job updates
const partialJobSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(256)
    .messages({
      'string.base': 'Job title must be a string',
      'string.min': 'Job title must be at least 3 characters long',
      'string.max': 'Job title cannot exceed 256 characters',
    }),
  company: Joi.string()
    .trim()
    .min(2)
    .max(256)
    .messages({
      'string.base': 'Company name must be a string',
      'string.min': 'Company name must be at least 2 characters long',
      'string.max': 'Company name cannot exceed 256 characters',
    }),
  location: Joi.string()
    .trim()
    .min(2)
    .max(128)
    .messages({
      'string.base': 'Location must be a string',
      'string.min': 'Location must be at least 2 characters long',
      'string.max': 'Location cannot exceed 128 characters',
    }),
  type: Joi.string()
    .valid(...jobTypes)
    .messages({
      'any.only': `Job type must be one of: ${jobTypes.join(', ')}`,
    }),
  category: Joi.string()
    .valid(...jobCategories)
    .messages({
      'any.only': `Job category must be one of: ${jobCategories.join(', ')}`,
    }),
  experience: Joi.string()
    .valid(...experienceLevels)
    .messages({
      'any.only': `Experience level must be one of: ${experienceLevels.join(', ')}`,
    }),
  minSalary: Joi.number()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Minimum salary must be a number',
      'number.integer': 'Minimum salary must be an integer',
      'number.min': 'Minimum salary cannot be negative',
    }),
  maxSalary: Joi.number()
    .integer()
    .when('minSalary', {
      is: Joi.exist(),
      then: Joi.number().min(Joi.ref('minSalary')).messages({
        'number.min': 'Maximum salary must be greater than or equal to minimum salary',
      }),
      otherwise: Joi.number().min(0).messages({
        'number.min': 'Maximum salary cannot be negative',
      }),
    })
    .messages({
      'number.base': 'Maximum salary must be a number',
      'number.integer': 'Maximum salary must be an integer',
    }),
  description: Joi.string()
    .trim()
    .min(10)
    .messages({
      'string.base': 'Description must be a string',
      'string.min': 'Description must be at least 10 characters long',
    }),
  requirements: Joi.array()
    .items(Joi.string().trim().min(1))
    .min(1)
    .messages({
      'array.base': 'Requirements must be an array of strings',
      'array.min': 'At least one requirement is required',
      'string.empty': 'Requirements cannot contain empty strings',
    }),
  benefits: Joi.array()
    .items(Joi.string().trim().min(1))
    .min(0)
    .messages({
      'array.base': 'Benefits must be an array of strings',
      'string.empty': 'Benefits cannot contain empty strings',
    }),
  skills: Joi.array()
    .items(Joi.string().trim().min(1))
    .min(0)
    .messages({
      'array.base': 'Skills must be an array of strings',
      'string.empty': 'Skills cannot contain empty strings',
    }),
  applicationDeadline: Joi.date()
    .iso()
    .min('now')
    .messages({
      'date.base': 'Application deadline must be a valid ISO date',
      'date.min': 'Application deadline must be in the future',
    }),
  isActive: Joi.boolean()
    .messages({
      'boolean.base': 'isActive must be a boolean',
    }),
});

// Function to validate full job input
const validateJobInput = (data) => {
  const { error, value } = jobSchema.validate(data, { abortEarly: false, stripUnknown: true });
  if (error) {
    throw new Error(error.details.map((err) => err.message).join(', '));
  }
  return value;
};

// Function to validate partial job input
const validatePartialJobInput = (data) => {
  const { error, value } = partialJobSchema.validate(data, { abortEarly: false, stripUnknown: true });
  if (error) {
    throw new Error(error.details.map((err) => err.message).join(', '));
  }
  return value;
};

export { validateJobInput, validatePartialJobInput };