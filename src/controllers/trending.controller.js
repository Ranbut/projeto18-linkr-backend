import { db } from "../database/database.connection.js";
import urlMetadata from 'url-metadata';

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
        SELECT 
            userGroup."username", userGroup."pictureUrl", userGroup.id AS "userId", 
            message, link, "posts".id, "posts"."createdAt"
        FROM "posts"
            LEFT JOIN "users" AS userGroup
            ON "posts"."userId" = userGroup."id"
            WHERE "posts".message LIKE $1
            ORDER BY posts."createdAt" DESC
            LIMIT 20;
        `, [hashtag]);

        const createSendObj = async () => {
            const output = await Promise.all(posts.map(async (o) => {
                try {
                    const metadata = await urlMetadata(o.link);
                    return {
                        ...o,
                        linkTitle: metadata.title,
                        linkImage: metadata.image,
                        linkDescription: metadata.description
                    };
                } catch (err) {
                    console.log(err);
                }
            }));
            return output;
        };

        const sendObj = await createSendObj();

        return res.status(200).send(sendObj);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}