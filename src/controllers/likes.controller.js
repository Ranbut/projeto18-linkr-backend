import { getlikeCount, getlikeList, likePostRep } from '../repository/likes.repository.js';

export async function likePost(req, res){
    const {id:postId, userId} = res.locals

    {const { code, message } = await likePostRep(postId, userId)
    if(code){return res.status(code).send(message)}}

    return res.sendStatus(200)
}

export async function likePostList(req, res){
    const {id:postId} = res.locals
    const {offset, limit} = req.body
    
    const { code, message, info } = await getlikeList(postId, offset, limit)
    if(code){return res.status(code).send(message)}

    return res.status(200).send(info)
}

export async function likeCount(req, res){
    const {id:postId} = res.locals
    
    const { code, message, info } = await getlikeCount(postId)
    if(code){return res.status(code).send(message)}

    return res.status(200).send(info)
}