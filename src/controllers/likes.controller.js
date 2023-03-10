import { getlikeList, likePostRep } from '../repository/likes.repository.js';

export async function likePost(req, res){
    const {id:postId, userId} = res.locals

    {const { code, message } = await likePostRep(postId, userId)
    if(code){return res.status(code).send(message)}}

    return res.sendStatus(200)
}

export async function likePostList(req, res){
    const {userId, id:postId} = res.locals
    
    const { code, message, info } = await getlikeList(userId, postId)
    if(code){return res.status(code).send(message)}

    return res.status(200).send(info)
}