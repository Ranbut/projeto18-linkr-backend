import { postEditSchema, postSchema } from "../schemas/posts.schema.js";
import { db } from "../database/database.connection.js";

export async function postPushValidation (req, res, next){
    try{
        const authorization = req.headers.authorization;

        if (!authorization) return res.sendStatus(401);

        const header = authorization.split(' ');
        const bearer = header[1];
      
        const tokenQuery = await db.query(`SELECT token FROM sessions WHERE token=$1;` , [bearer]);
      
        if (tokenQuery.rowCount === 0) return res.sendStatus(401);

        const post = req.body;

        const { error } = postSchema.validate(post, { abortEarly: false });

        if (error) {
          const errors = error.details.map(detail => detail.message);
          return res.status(422).send(errors);
        }

        res.locals.post = post;
        res.locals.authorization = authorization;

        next();
        }
        catch(err){
          res.status(500).send(`Erro no servidor: ${err.message}`);
      }
}

export async function postPutValidation (req, res, next){
  try{
      const authorization = req.headers.authorization;

      if (!authorization) return res.sendStatus(401);

      const header = authorization.split(' ');
      const bearer = header[1];
    
      const tokenQuery = await db.query(`SELECT token FROM sessions WHERE token=$1;` , [bearer]);
    
      if (tokenQuery.rowCount === 0) return res.sendStatus(401);

      const post = req.body;

      const { error } = postEditSchema.validate(post, { abortEarly: false });

      if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(422).send(errors);
      }

      res.locals.post = post;
      res.locals.authorization = authorization;

      next();
      }
      catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}