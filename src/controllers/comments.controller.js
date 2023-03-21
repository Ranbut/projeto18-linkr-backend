import { getCommentRep, postCommentRep } from "../repository/comments.repository"

export async function postComment(req, res) {
    console.log(req.body)
}

export async function getComment(req, res) {
    console.log(req)
}