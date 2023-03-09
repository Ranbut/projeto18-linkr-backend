import { db } from '../database/database.connection.js'
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { createSession, createUser, getUserInfo, toLogOut } from '../repositories/auth.repository.js';

export async function signUp(req, res) {

    const { email, password, username, pictureUrl } = res.locals.user

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        await createUser({ email, passwordHash, username, pictureUrl })

        res.status(201).send("Created.")
    }

    catch (err) {
        res.status(422).send(err.message)
    }
}

export async function signIn(req, res) {

    const { email, password } = res.locals.user
    const token = uuidV4();

    try {

        const userInfo = await getUserInfo(email)

        const passwordCompare = bcrypt.compareSync(password, userInfo.rows[0].password);

        const userId = userInfo.rows[0].id

        if (userInfo.rowCount !== 0 && passwordCompare) {

            await createSession({ userId, token })

            res.status(200).send({ token: token })

        } else {
            res.status(401).send("Incorrect e-mail and password.");
        }

    }
    catch (err) {
        res.status(422).send(err.message)
    }


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