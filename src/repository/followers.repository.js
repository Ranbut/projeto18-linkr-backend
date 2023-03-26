import { db } from "../database/database.connection.js"
import RepositoryResponse from "./response.js"

 async function insertFollow(userId, followId){
 const resp = new RepositoryResponse

    try { return await db.query(`
    INSERT INTO followers ("userId", "followId") VALUES ($1, $2)`, [userId, followId])
         
     } catch(err){return resp.direct(500, err.message)}
}

 async function removeFollow(userId, followId){
   const resp = new RepositoryResponse
     try {
    await db.query(`
    DELETE FROM followers WHERE "userId"= $1 AND "followId"= $2`, [userId, followId]
    )

     } catch(err){return resp.direct(500, err.message)}
}

async function verifyFollow(userId, followId){

       const toggleFollow = await db.query(`
        SELECT * FROM followers WHERE "userId"= $1 AND "followId" = $2`, [userId, followId]
        )

return toggleFollow.rowCount
}
async function getFollowById(userId){
 return await db.query(`SELECT "followId" FROM followers WHERE "userId" = $1`, [userId])
}

const followRepository = {
    insertFollow, removeFollow, verifyFollow, getFollowById
}

export default followRepository;