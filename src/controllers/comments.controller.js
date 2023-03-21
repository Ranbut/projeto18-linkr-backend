import { getCommentRep, postCommentRep } from "../repository/comments.repository.js"

export async function postComment(req, res) {

    const {postId, userId, message} = req.body

    try{
        await postCommentRep(postId, userId, message)
        
        res.status(200).send("Comment posted")
        
    }catch{
        return res.sendStatus(500);
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