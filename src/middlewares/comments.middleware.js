import { commentSchema } from "../schemas/comments.schema.js";

export async function postCommentValidation (req, res, next){

    const comment = req.body 


    const validation = commentSchema.validate(comment, {abortEarly: false})

    if (validation.error){
        const errors = validation.error.details.map((detail) => detail.message)
        res.status(422).send(errors)
        return
    }

    res.locals.comment = comment

    next()

}