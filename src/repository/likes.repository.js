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


export async function getlikeList(_userId, _postId){
    const resp = new RepositoryResponse

    try {
        const query = await db.query(`
        SELECT 
        likes."userId" as id, 
        usr.username

        FROM likes 
        INNER JOIN users usr ON usr.id = likes."userId"
       	WHERE "postId" = $1

        ORDER BY likes."createdAt" ASC
        `, 
        [_postId])

        const userLike = await db.query(`
        SELECT * FROM likes WHERE "userId" = $1 AND "postId" = $2
        `, 
        [_userId, _postId])

        let userLiked = false;

        if(userLike.rows.length === 1){
            userLiked = true;
        }

        resp.info ={
            "userId": _userId,
            "userLikedThisPost": userLiked,
            "likes": query.rows} 
    
        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}