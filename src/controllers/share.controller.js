import { db } from "../database/database.connection.js";

export const sharePost = async (req, res) => {

    const { userId } = res.locals;
    const postId = req.params.id;

    console.log("rodei")

    try {

        await db.query(`
            SELECT toggle_share($1, $2)
        `, [postId, userId]);

        return res.sendStatus(200);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export const getShareList = async (req, res) => {

    const { userId } = res.locals
    const postId = req.params.id;

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

        const userShared = (userShare.rowCount === 1) ? true : false;

        const response = {
            "userId": userId,
            "userSharedThisPost": userShared,
            "shares": query
        }

        return res.send(response);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}