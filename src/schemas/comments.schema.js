import joi from 'joi';

export const commentSchema = joi.object({
      postId: joi.number().required().integer(),
      message: joi.required()
});