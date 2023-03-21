const checkURL = () => {
    return async (req, res, next) => {
        try {

            const { link } = req.body;

            new URL(link);

            next();

        } catch (err) {
            return res.status(422).send(err.message);
        }
    }
};

export default checkURL;