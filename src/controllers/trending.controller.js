import { db } from "../database/database.connection.js";

export async function getTrend(req, res) {
    try {
        const { rows: trending } = await db.query(`
            SELECT 
                h.hashtag
            FROM "messagesHashtags" mh
            LEFT JOIN hashtags h
            ON mh."hashtagId" = h.id
            GROUP BY h.id
            ORDER BY COUNT(mh."postId") DESC
            LIMIT 10
        `);

        return res.send(trending);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getPostByHashtag(req, res) {
    const hashtag = "%#" + req.params.hashtag + "%"

    try {
        const { rows: posts } = await db.query(`
            SELECT *
            FROM "posts"
            WHERE message LIKE $1
            ORDER BY "createdAt" DESC
        `, [hashtag]);

        return res.send(posts);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}