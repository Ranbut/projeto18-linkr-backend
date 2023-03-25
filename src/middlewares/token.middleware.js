import { db } from "../database/database.connection.js"

export async function tokenValidation(req, res, next) {


    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "")

    try {

        const userId = await db.query(`SELECT "userId" FROM sessions WHERE token =$1`, [token])
        if (userId.rowCount === 0) { return res.status(401).send("Não autorizado") }

        res.locals.userId = userId.rows[0].userId



        next()

    } catch (error) {
        res.status(500).send(`Erro no servidor: ${error.message}`);
    }


}

