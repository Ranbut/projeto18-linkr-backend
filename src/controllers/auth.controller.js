import { signInUser, createUser, toLogOut, updateCreatedAt, getLastTime, getUser } from '../repository/auth.repository.js';
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

export async function signIn(req, res) {
    const session = {
        userId: res.locals.id,
        token: uuidV4(),
        createdAt: Date.now()
    }

    {
        const { code, message } = await signInUser(session)
        if (code) { return res.status(code).send(message) }
    }

    const item = await getUser(session.userId)

    const user = {
        userId: item.rows[0].id,
        email: item.rows[0].email,
        username: item.rows[0].username,
        pictureUrl: item.rows[0].pictureUrl,
        createdAt: item.rows[0].createdAt,
    }


    return res.status(200).send(user)

    // return res.status(200).send({ token: session.token })
}

export async function logOut(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        res.sendStatus(401);
        return;
    }

    try {
        await toLogOut(token)
        res.sendStatus(201)
    }
    catch (err) {
        res.status(422).send(err.message)
    }

}

export async function persistSession(req, res){

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "")
       
        try {
            await updateCreatedAt(token)

           const lastTime = await getLastTime(token)

            res.status(201).send(lastTime.rows[0].createdAt)
        }
    
        catch (err) {
            res.status(422).send(err.message)
        }
    }
    