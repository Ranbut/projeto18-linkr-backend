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


export async function getlikeList(_postId, _offset, _limit){
    const resp = new RepositoryResponse

    try {
        const query = await db.query(`
        SELECT 
        likes."userId", 
        usr.username,
        usr."pictureUrl"

        FROM likes 
        INNER JOIN users usr ON usr.id = likes."userId"
       	WHERE "postId" = $1
        ORDER BY likes."createdAt" ASC
        OFFSET $2 LIMIT $3;
        `, 
        [_postId, _offset, _limit])

        resp.info = query.rows
        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}

export async function getlikeCount(_postId){
    const resp = new RepositoryResponse

    try {
        const query = await db.query(`
        SELECT * FROM view_likes_count WHERE id = $1
        `, 
        [_postId])
        
        resp.info = {count: query.rows[0].likeCount}
        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}