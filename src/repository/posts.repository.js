import { db } from "../database/database.connection.js"

export async function getPostsRep() {
    try {
        const posts = await db.query(`
        SELECT 
        userGroup."username", userGroup."pictureUrl", userGroup.id AS "userId", 
        message, link, "posts".id
        FROM "posts"
        LEFT JOIN "users" AS userGroup
        ON "posts"."userId" = userGroup."id"
        ORDER BY posts."createdAt" DESC LIMIT 20;
    `).rows;

        return posts;

    } catch (err) {
        return err.message;
    }
}

export async function getPostsUserRep(userId) {
    try {
        const posts = await db.query(`
        SELECT userGroup."username", userGroup."pictureUrl", userGroup.id AS "userId", message, link, "posts".id
        FROM "posts"
        LEFT JOIN "users" AS userGroup
        ON "posts"."userId" = userGroup."id"
        WHERE userGroup.id = $1
        ORDER BY posts."createdAt" DESC LIMIT 20;
        `, [userId]).rows;
        return posts;

    } catch (err) {
        return err.message;
    }
}

export async function getPostRep(postId) {
    try {
        const post = await db.query(`SELECT * FROM "posts" WHERE "id" = $1;`, [postId]);
        return post;

    } catch (err) {
        return err.message;
    }
}

export async function updateMsgPostRep(postId, message, hashtagsId) {
    try {
        await db.query(`DELETE FROM "messagesHashtags" WHERE "postId" = $1`, [postId]);

        await db.query(`UPDATE "posts" SET "message"=$1 WHERE "id"=$2;`, [message, postId]);

        for (let i = 0; i < hashtagsId.length; i++) {
            await db.query(`
                INSERT INTO "messagesHashtags"(
                    "postId", "hashtagId"
                )
                VALUES ($1, $2)
            `, [postId[0].id, hashtagsId[i]]);
        }

        return;

    } catch (err) {
        return err.message;
    }
}


export async function deletePostRep(postId) {
    try {
        await db.query(`
            DELETE FROM "messagesHashtags"
            WHERE "postId" = $1
        `, [postId]);

        await db.query(`
            DELETE FROM "likes"
            WHERE "postId" = $1
        `, [postId]);

        await db.query(`
            DELETE FROM "posts"
            WHERE id = $1
        `, [postId]);
        return;

    } catch (err) {
        return err.message;
    }
}
