import { db } from '../database/database.connection.js'
import { signInUser, createUser, toLogOut } from '../repository/auth.repository.js';
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function signUp(req, res) {

    const { email, password, username, pictureUrl } = req.body

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        await createUser({ email, passwordHash, username, pictureUrl })

        res.status(201).send("Created.")
    }

    catch (err) {
        res.status(422).send(err.message)
    }
}

export async function signIn(req, res){
    const session = {
    userId: res.locals.id,
    token: uuidV4(),
    createdAt: Date.now()}

    {const { code, message } = await signInUser(session)
    if(code){return res.status(code).send(message)}}

    return res.status(200).send({token: session.token})
}

export async function logOut(req, res) {

    const { token } = req.body

    if (!token) {
        res.sendStatus(401);
        return;
    }

    try {
        await toLogOut({ token })

        res.status(201).send("logout")
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
        SELECT userGroup."userName", userGroup."pictureUrl"
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