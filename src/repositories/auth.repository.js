import { db } from "../database/database.connection.js";

export async function createUser({ email, passwordHash, username, pictureUrl }) {
    return await db.query(`
        INSERT INTO users 
        (email, password, username, "pictureUrl") 
        VALUES ($1, $2, $3, $4);
        `, [email, passwordHash, username, pictureUrl])
}


export async function getUserInfo(email) {
    const result = await db.query(`
        SELECT * FROM users
        WHERE email = $1
        `, [email])

    return result
}

export async function createSession({ userId, token }) {
    return await db.query(`
            INSERT INTO sessions 
            ("userId", token) 
            VALUES ($1, $2);
            `, [userId, token])
}

export async function toLogOut({ token }) {
    return await db.query(`
        DELETE 
        FROM sessions 
        WHERE token = $1;
        `, [token])

}