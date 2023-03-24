import { db } from "../database/database.connection.js";

export const sharePost = async (req, res) => {

    const { postId, userId } = req.body;

    try {

        await db.query(`
            SELECT toggle_like($1, $2)
        `, [postId, userId]);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export const getShareList = async (req, res) => {

    const { postId, userId } = req.body;

    try {

        const { rows: query } = await db.query(`
        SELECT 
        sp."userId" as id, 
        u.username

        FROM "sharedPosts" as sp
        INNER JOIN users u
        ON u.id = sp."userId"
       	WHERE "postId" = $1

        ORDER BY sp."createdAt" ASC
        `,
            [postId])

        const userShare = await db.query(`
        SELECT * FROM "sharedPosts" WHERE "userId" = $1 AND "postId" = $2
        `,
            [userId, postId])

        const userShared = (userShare.rowsCount === 1) ? true : false;

        const response = {
            "userId": userId,
            "userSharedThisPost": userShared,
            "shares": query
        }

    } catch (err) {
        return res.status(500).send(err.message);
    }
}