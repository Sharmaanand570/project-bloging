const AuthorModel = require("../models/authorModel.js")

const createAuthor = async function (req, res) {
    try {
        let authorData = req.body;
        const { fname, lname, title, email, password } = authorData;
        if (!(fname && lname && title && email && password)) {
            res.status(400).send({ status: true, msg: "data not found" })
        }
        if ((typeof (fname) || typeof (lname) || typeof (title) || typeof (email) || typeof (password)) === Number) {
            res.status(400).send({ status: true, msg: "please input value in string" })
        }
        let checkMail = await AuthorModel.findOne({ email: email })
        if (checkMail) {
            return res.status(400).send({ status: false, msg: " dupllicate email" })
        }
        let savedAuthorData = await AuthorModel.create(authorData);
        if (!savedAuthorData) {
            res.status(400).send({ status: false, msg: "" })
        }
        res.status(201).send({ status: true, data: savedAuthorData });
    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.createAuthor = createAuthor
