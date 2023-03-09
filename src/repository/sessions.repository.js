import { db } from "../database/database.connection.js";
import RepositoryResponse from "./response.js";

export async function validateToken(token){
    const resp = new RepositoryResponse

    try{
        const session = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])
        
        if(session.rowCount === 0){return resp.direct(401, "This session doesn't exist")}
        
        resp.info = {userId: session.rows[0].userId}
        return resp.continue()

    } catch(err){return resp.direct(500, err.message)}
};