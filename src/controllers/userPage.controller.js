import { db } from "../database/database.connection.js"

export async function getByIdUserPage(req, res) {
    const id = req.params.id
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "")


    const isToken = await db.query(`SELECT "sessions" FROM sessions WHERE token =$1`, [token])

    if (isToken.rowCount === 0) { return res.status(401).send("Não autorizado") }

    try {
        const userPosts = await db.query(`
        SELECT users."username", users."pictureUrl", message, link, "posts".id
        FROM posts
        JOIN users
        ON posts."userId" = users.id
        WHERE posts."userId" = $1
        ORDER BY posts."createdAt" DESC LIMIT 20;
    `, [id]);

        if (userPosts.rowCount === 0) { return res.status(404).send("usuário não encontrado") }

        return res.status(200).send(userPosts.rows)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function filterUsers(req, res) {
    const { username } = req.params
    const userId = res.locals.userId

    try {
        const allUsers = await db.query(`  
          SELECT id, username, email, "pictureUrl" from users WHERE username ILIKE $1`, [`${username}%`]);
const usersFollowed = await db.query(`SELECT "followId" from followers WHERE "userId" = $1`, [userId])

const usersFollowedIds = usersFollowed.rows.map(item => item.followId)
    const usersIFollow = []
    const usersIDontFollow = []
    allUsers.rows.forEach(user => {
        if (usersFollowedIds.includes(user.id)) {
            usersIFollow.push({...user, isFollowing : true})
        } else {
            usersIDontFollow.push({...user, isFollowing : false})
        }
    })

        return res.status(200).send([...usersIFollow,...usersIDontFollow])
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function GetUserByID(req, res) {
    const id = req.params.id

    try {
        const userInfo = await db.query(`
            SELECT id, username, "pictureUrl"
            FROM "users"
            WHERE id = $1;
            `, [id])

        res.status(201).send(userInfo.rows[0])
    }
    catch (err) {
        res.status(422).send(err.message)
    }
}

export async function GetUserByToken(req, res) {
    const { token } = req.body

    if (!token) {
        res.sendStatus(401);
        return;
    }

    try {
        const userInfo = await db.query(`
        SELECT userGroup.id, userGroup.username, userGroup."pictureUrl"
        FROM "sessions"
        LEFT JOIN "users" AS userGroup
        ON "sessions"."userId" = userGroup."id"
        WHERE token = $1;
        `, [token])

        res.status(201).send(userInfo.rows[0])
    }
    catch (err) {
        res.status(422).send(err.message)
    }
}