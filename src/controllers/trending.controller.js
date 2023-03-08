import { db } from "../database/database.connection.js";

export async function getTrend(req, res) {
    try {
        const { rows: trending } = db.query(`
            SELECT * FROM "messagesHashtags"
        `);

        return res.send(trending);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}