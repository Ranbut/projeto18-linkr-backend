import { db } from "../database/database.connection.js";

export default function getHashtag() {
    return async (req, res, next) => {
        try {
            const post = res.locals.post;
            const hashtags = post.message.match(/#\w+/g);
            const hashtagsIds = [];

            if (!hashtags) {
                res.locals.hashtagsIds = hashtagsIds;
                return next();
            }
            
            for (let i = 0; i < hashtags.length; i++) {
                await db.query(`
                    INSERT INTO hashtags(hashtag)
                    VALUES ($1)
                    ON CONFLICT DO NOTHING
                `, [hashtags[i]]);
            }

            for (let i = 0; i < hashtags.length; i++) {
                const { rows: id } = await db.query(`
                    SELECT id
                    FROM hashtags
                    WHERE hashtag = $1
                `, [hashtags[i]]);
                hashtagsIds.push(id[0].id);
            }

            res.locals.hashtagsIds = hashtagsIds;
            return next();
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
}