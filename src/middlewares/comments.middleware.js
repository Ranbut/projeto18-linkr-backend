import { db } from "../database/database.connection.js";

export async function postCommentValidation (req, res, next){
    try{
        console.log("Validation here")
        next();
        }
        catch(err){
          res.status(500).send(`Erro no servidor: ${err.message}`);
      }
}