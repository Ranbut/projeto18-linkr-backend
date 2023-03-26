import urlMetadata from 'url-metadata';
import { getPostsRep, getPostsUserRep, getPostRep, updateMsgPostRep, deletePostRep, insertPostRep, getRecentsPostsRep, getOldPostsRep } from "../repository/posts.repository.js";

export async function getPost(req, res) {
    const { userId } = res.locals;
    try {
        const posts = await getPostsRep(userId);

        const createSendObj = async (result) => {
            const output = await Promise.all(result.map(async (o) => {
                try {
                    const metadata = await urlMetadata(o.link);
                    return {
                        ...o,
                        linkTitle: metadata.title,
                        linkImage: metadata.image,
                        linkDescription: metadata.description
                    };
                } catch (error) {
                    return error;
                }
            }));
            return output;
        };

        const sendObj = await createSendObj(posts);

        return res.status(200).send(sendObj);

    } catch (err) {
        return res.status(422).send(err.message);
    }
}

export async function getRecentPosts(req, res) {
    try {
        const { userId } = res.locals;
        const { date } = req.params;

        const posts = await getRecentsPostsRep(userId, date);

        const createSendObj = async (result) => {
            const output = await Promise.all(result.map(async (o) => {
                try {
                    const metadata = await urlMetadata(o.link);
                    return {
                        ...o,
                        linkTitle: metadata.title,
                        linkImage: metadata.image,
                        linkDescription: metadata.description
                    };
                } catch (error) {
                    return error;
                }
            }));
            return output;
        };

        const sendObj = await createSendObj(posts);

        return res.status(200).send(sendObj);

    } catch (err) {
        return res.status(422).send(err.message);
    }
}

export async function getOldPosts(req, res) {
    try {
        const { userId } = res.locals;
        const { date } = req.params;

        const posts = await getOldPostsRep(userId, date);

        const createSendObj = async (result) => {
            const output = await Promise.all(result.map(async (o) => {
                try {
                    const metadata = await urlMetadata(o.link);
                    return {
                        ...o,
                        linkTitle: metadata.title,
                        linkImage: metadata.image,
                        linkDescription: metadata.description
                    };
                } catch (error) {
                    return error;
                }
            }));
            return output;
        };

        const sendObj = await createSendObj(posts);

        return res.status(200).send(sendObj);

    } catch (err) {
        return res.status(422).send(err.message);
    }
}

export async function getPostsUser(req, res) {
    try {
        const id = req.params.id;
        const posts = await getPostsUserRep(id);
        const createSendObj = async (posts) => {
            const output = await Promise.all(posts.map(async (o) => {
                try {
                    const metadata = await urlMetadata(o.link);
                    return {
                        ...o,
                        linkTitle: metadata.title,
                        linkImage: metadata.image,
                        linkDescription: metadata.description
                    };
                } catch (error) {
                    console.log(error);
                }
            }));
            return output;
        };
        
        
        const sendObj = await createSendObj(posts);
        
       return res.status(200).send(sendObj);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function pushPost(req, res) {
    try {
        const { message, link } = res.locals.post;
        const authorization = res.locals.authorization;
        const hashtagsId = res.locals.hashtagsIds;

        const header = authorization.split(' ');
        const bearer = header[1];

        await insertPostRep(bearer, message, link, hashtagsId);

        res.status(200).send("Post pushed.");

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function editPost(req, res) {
    try {
        const id = req.params.id;
        const { message } = req.body;
        const hashtagsId = res.locals.hashtagsIds;

        const result = await getPostRep(id);

        if (result.rowCount === 0) return res.status(404).send("Post not found.");

        await updateMsgPostRep(id, message, hashtagsId);

        res.status(200).send("Post edited.");
    }

    catch (err) {
        res.status(422).send(err.message);
    }
}

export async function deletePost(req, res) {

    const id = req.params.id;

    try {
        deletePostRep(id);

        res.sendStatus(202);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}
