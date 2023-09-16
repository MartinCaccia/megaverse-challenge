import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('develop', 'test', 'production')
    .default('develop'),
  PORT: Joi.number().default(3000),
  HTTP_TIMEOUT: Joi.number().default(5000),
  CANDIDATE_ID: Joi.string().required(),
  MEGAVERSE_URL: Joi.string().uri().required(),
  POLYANETS_URN: Joi.string().required(),
  GOAL_URN: Joi.string().required(),
});
