import joi from 'joi';

export const postSchema = joi.object({
      message: joi.string().required(),
      link: joi.string().required()
})


