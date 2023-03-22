import { getCommentRep, postCommentRep } from "../repository/comments.repository.js"
import { validateToken } from "../repository/sessions.repository.js";

export async function postComment(req, res) {

  const {postId, message} = res.locals.comment

  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");


  if (!token) {
    res.sendStatus(401);
    return;
  }

  try{
    const {info} =  await validateToken(token)
    const userId = info.userId

    await postCommentRep(postId, userId, message)
      
    res.status(201).send("Comment posted.")

    }catch{
      res.status(401).send("Please login to comment.");
    }

}




export async function getComment(req, res) {

    const { id } = req.params

  try {
    const {result} = await getCommentRep(id)
    
	if (result.rowCount === 0) {
    return res.sendStatus(404)
    }

    res.send(result.rows);

  } catch (error) {
    return res.sendStatus(500);
  }

}