const AuthorModel = require("../models/authorModel.js")

const createAuthor = async function (req, res) {
    try {
        let authorData = req.body;
        let checkMail = await AuthorModel.findOne({ email:authorData.email})
        if (checkMail) {
            return res.status(400).send({ status: false, msg: " dupllicate email" })
        }
        try {
            let savedAuthorData = await AuthorModel.create(authorData);
            res.status(201).send({ status: true, data: savedAuthorData });
        }
        catch (err) {
            res.status(400).send({ status: false, msg: err.message })
        }

    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.createAuthor = createAuthor
