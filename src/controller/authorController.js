const AuthorModel = require("../models/authorModel.js")

const createAuthor = async function (req, res) {
    try {

        let authorData = req.body;

        const { fname, lname, title, email, password } = authorData;

        if (!(fname && lname && title && email && password)) {
            return res.status(400).send({ status: false, msg: "key value is not present" })
        }

        let checkMail = await AuthorModel.findOne({ email: email });
        if (checkMail) {
            return res.status(400).send({ status: false, msg: " duplicate email" })
        }
        if ((title !== "Mr") && (title !== "Mrs") && (title !== "Miss")) {
            res.status(400).send({ status: false, msg: "please enter correct title eg Mr,Mrs,Miss" })
        }

        if (typeof (fname) === "string") {
            if (typeof (lname) === "string") {
                if (typeof (email) === "string") {
                    if (typeof (password) === "string") {
                        let savedAuthorData = await AuthorModel.create(authorData);
                        if (!savedAuthorData) {
                            res.status(400).send({ status: false, msg: "cannot create data" })
                        }
                        res.status(201).send({ status: true, data: savedAuthorData });
                    } else { res.status(400).send({ status: false, data: "password is invalid" }) }
                } else { res.status(400).send({ status: false, data: "email is invalid" }) }
            } else { res.status(400).send({ status: false, data: "lname is invalid" }) }
        } else { res.status(400).send({ status: false, data: "fname is invalid" }) }

    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.createAuthor = createAuthor
