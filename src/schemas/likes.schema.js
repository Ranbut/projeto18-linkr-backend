import joi from 'joi';

export const likeListSchema = joi.object({
      offset: joi.number().required().integer(),
      limit: joi.number().required().integer()
});