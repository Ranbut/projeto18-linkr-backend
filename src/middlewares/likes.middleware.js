import { likeListSchema } from "../schemas/likes.schema.js"
import { schemaValidation } from "./generics.middleware.js"

export async function likeListValidation (req, res, next){
    
    {const { code, message } = schemaValidation(likeListSchema, req.body)
    if(code){return res.status(code).send(message)}}

    next()
}