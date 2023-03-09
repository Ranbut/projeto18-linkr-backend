import { signUpSchema, signInSchema } from "../schemas/auth.schema.js";
import { schemaValidation } from "./generics.middleware.js";
import { checkUser, checkUserAlreadyExists } from "../repository/auth.repository.js";


export async function signUpSchemaValidation (req, res, next){
    const user = req.body
    
    {const { code, message } = schemaValidation(signUpSchema, user)
    if(code){return res.status(code).send(message)}}

    {const { code, message } = await checkUserAlreadyExists(user.username, user.email)
    if(code){return res.status(code).send(message)}}

    next()
}


//////////////////////////////////////////////////////////////


export async function signInSchemaValidation (req, res, next){
    const user = req.body

    {const { code, message } = schemaValidation(signInSchema, user)
    if(code){return res.status(code).send(message)}}

    {const { code, message, info } = await checkUser(user)
    if(code){return res.status(code).send(message)}
    else{res.locals.id = info.id}}

    next()
}