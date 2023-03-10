import { db } from "../database/database.connection.js"
import { checkHash } from "../database/salted.js"
import RepositoryResponse from "./response.js"

export async function checkUserAlreadyExists(_username, _email){
    const resp = new RepositoryResponse
    let message = ""
    
    try {
        const query = await db.query(`
        SELECT username, email FROM users 
        WHERE LOWER(username) = LOWER($1)
        OR
        LOWER(email) = LOWER($2)`,
        [_username, _email])

        query.rows.map(item => {
            const { username, email } = item
            if(username.toLowerCase() === _username.toLowerCase()){
            message += "This username is already in use\n"}
            if(email.toLowerCase() === _email.toLowerCase()){
            message += "This email is already in use\n"}
        })

        resp.condition = query.rowCount > 0
        resp.errCode = 409
        resp.errMessage = message
        return resp.byCondition()

    } catch(err){return resp.direct(500, err.message)}
}


/////////////////////////////////////////////////////////


export async function checkUser(_user){
    const resp = new RepositoryResponse
    const {email:_email, password:_password} = _user
    
    try {
        const query = await db.query(`
        SELECT id, password FROM users 
        WHERE LOWER(email) = LOWER($1)`,
        [_email])

        {resp.condition = !query.rowCount > 0
        resp.errCode = 401
        resp.errMessage = "This account doesn't exist"
        const { code, message } = resp.byCondition()
        if(code){return resp.direct(code, message)}}

        const {password:hash, id} = query.rows[0]
        const { code, message } = await checkHash(_password, hash)
        if(code){return resp.direct(code, message)}

        resp.info = {id}
        return resp.continue()

    } catch(err){return resp.direct(500, err.message)}
}


/////////////////////////////////////////////////////////


export async function signInUser(_session){
    const resp = new RepositoryResponse
    const {userId, token, createdAt} = _session

    try {
        await db.query(`
            INSERT INTO sessions ("userId", token, "createdAt") 
            VALUES ($1, $2, $3)`, 
            [userId, token, createdAt])

        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}

export async function createUser({ email, passwordHash, username, pictureUrl }) {
    return await db.query(`
        INSERT INTO users 
        (email, password, username, "pictureUrl") 
        VALUES ($1, $2, $3, $4);
        `, [email, passwordHash, username, pictureUrl])
}

export async function toLogOut( token ) {
    return await db.query(`
        DELETE 
        FROM sessions 
        WHERE token = $1;
        `, [token])

}


export async function updateCreatedAt(token){

          return await db.query(`
            UPDATE sessions 
            SET "createdAt"=$1 
            WHERE token=$2`, 
            [Date.now(), token])
        }


 export async function getLastTime(token){

            const thisSession = db.query(`
            SELECT "createdAt"
            FROM sessions
            WHERE token=$1
            `, [token])

            return thisSession
        }
  

        export async function getUser(userId){

            const user = db.query(`
            SELECT *
            FROM users
            WHERE id=$1
            `, [userId])

            return user
        }
  