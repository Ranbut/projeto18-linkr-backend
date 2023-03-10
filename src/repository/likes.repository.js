import { db } from "../database/database.connection.js"
import RepositoryResponse from "./response.js"

export async function likePostRep(_postId, _userId){
    const resp = new RepositoryResponse

    try {
        await db.query(`
            SELECT toggle_like($1, $2)
        `, 
            [_postId, _userId])

        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}


export async function getlikeList(_postId, _userId){
    const resp = new RepositoryResponse

    try {
        await db.query(`
        `, 
            [_postId, _userId])

        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}