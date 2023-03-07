import { db } from '../database/database.connection.js'
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function signUp(req, res) {

    const { email, password, username, pictureUrl } = res.locals.user

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        await db.query(`
        INSERT INTO users 
        (email, password, username, "pictureUrl") 
        VALUES ($1, $2, $3, $4);
        `, [email, passwordHash, username, pictureUrl])

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

        const userInfo = await db.query(`
        SELECT * FROM users
        WHERE email = $1
        `, [email])

        const passwordCompare = bcrypt.compareSync(password, userInfo.rows[0].password);

        if (userInfo.rowCount!==0 && passwordCompare) {

            await db.query(`
            INSERT INTO sessions 
            ("userId", token) 
            VALUES ($1, $2);
            `, [userInfo.rows[0].id, token])

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
        const logout = await db.query(`
        DELETE 
        FROM sessions 
        WHERE token = $1;
        `, [token])
       
        res.status(201).send("logout")
    }
    catch (err) {
        res.status(422).send(err.message)
    }

}