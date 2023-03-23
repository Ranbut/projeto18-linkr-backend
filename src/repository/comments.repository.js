import { db } from "../database/database.connection.js"

export async function postCommentRep(postId, userId, message) {

    try {
        await db.query(`
            INSERT INTO 
            comments 
            ("postId" , "userId", "message") 
            VALUES ($1, $2, $3) `
            , [postId, userId, message]);

        return

    } catch (err) {
        return err.message
    }
}


export async function getCommentRep(postId) {

    try {
        const result = await db.query(
            `SELECT 
            comments.id AS "commentId", comments."postId", comments."userId", users.username, comments.message,
            posts."userId" AS "postOwnerId"
            FROM comments
            JOIN users
            ON comments."userId"=users.id
            JOIN posts
            ON comments."postId"=posts.id
            WHERE comments."postId"=$1`
            , [postId])        

        return result

    } catch (err) {
        return err.message
    }

}