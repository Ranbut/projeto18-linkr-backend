import followRepository from "../repository/followers.repository.js";
import { getUser } from "../repository/auth.repository.js";


async function getFollowById(req, res){
    const userId = res.locals.userId

    const response = await followRepository.getFollowById(userId);
const filteredResponse = response.rows.map((item) => item.followId)
    return res.status(200).send(filteredResponse)

}

async function toggleFollow(req, res) {
    const userId = res.locals.userId
    const followId = req.params.followId 

const followExists = await getUser(followId);

if(followExists.rowCount === 0){
return res.sendStatus(404)
}

    if(+followId === +userId) {
        return res.sendStatus(400);
    }

    const isFollow = await followRepository.verifyFollow(userId, followId)

    if (isFollow <= 0) {
        await followRepository.insertFollow(userId, followId)
        return res.sendStatus(200)
    }
    await followRepository.removeFollow(userId, followId)
    return res.sendStatus(200)
}

const followController = {
    toggleFollow, getFollowById
}

export default followController