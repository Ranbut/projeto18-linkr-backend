import followRepository from "../repository/followers.repository.js";

 async function toggleFollow(req,res){
    const userId = res.locals.userId
    const followId = req.params.followId

    const isFollow = await followRepository.verifyFollow(userId , followId)
     
if(isFollow <=0){
await followRepository.insertFollow(userId,followId)
return res.sendStatus(200)
}
     await followRepository.removeFollow(userId,followId)
   return res.sendStatus(200)
}

const followController = {
    toggleFollow
}

export default followController