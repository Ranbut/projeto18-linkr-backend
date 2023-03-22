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
            `SELECT *
                FROM comments 
                WHERE "postId"=$1`
            , [postId])

        return result

    } catch (err) {
        return err.message
    }

}