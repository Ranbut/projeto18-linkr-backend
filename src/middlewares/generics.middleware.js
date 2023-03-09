import RepositoryResponse from "../repository/response.js";
import { validateToken } from "../repository/sessions.repository.js";


export function schemaValidation(schema, data, code){
    const resp = new RepositoryResponse
    const { error } = schema.validate(data, { abortEarly: false });
    
    if (error) {
        const errors = error.details.map((detail) => detail.message);

        return resp.direct(code || 422, errors)
    }
    return resp.continue
}


////////////////////////////////////////////////////////////


export async function idParamSanitization(req, res, next) {
    let { id } = req.params
    id = Number.parseInt(id)
    id = isNaN(id) ? "" : id

    res.locals.id = id
    
    next();
}


////////////////////////////////////////////////////////////


export async function authValidation(req, res, next){
    const {authorization} = req.headers
    
    if(!authorization){return res.sendStatus(401)}
    
    if(!authorization.startsWith("Bearer ")){return res.sendStatus(401)}
    
    const token = authorization.replace("Bearer ", "")
    
    const { code, message, info} = await validateToken(token)
    if(code){return res.status(code).send(message)}
    else{res.locals.userId = info.userId}
        
    next()
};