const authorModel = require("../models/authorModel.js")
const jwt=require('jsonwebtoken')
const validString = function(valid){
    if (typeof (valid) === "string" && valid.trim().length !== 0) return true
    return false
}

const createAuthor = async function (req, res) {
    try {

        let authorData = req.body;

        const { fname, lname, title, email, password } = authorData;

        if (!(fname && lname && title && email && password)) {
            return res.status(400).send({ status: false, msg: "key value is not present" })
        }

        let checkMail = await authorModel.findOne({ email: email });
        if (checkMail) {
            return res.status(409).send({ status: false, msg: " duplicate email" })
        }
        if ((title !== "Mr") && (title !== "Mrs") && (title !== "Miss")) {
            res.status(400).send({ status: false, msg: "please enter correct title eg Mr,Mrs,Miss" })
        }

        if (typeof (fname) === "string" && fname.trim().length !== 0) {
            if (typeof (lname) === "string" && lname.trim().length !== 0) {
                if (typeof (email) === "string" && email.trim().length !== 0) {
                    if (typeof (password) === "string" && password.trim().length !== 0) {
                        let savedAuthorData = await authorModel.create(authorData);
                        if (!savedAuthorData) {
                            return res.status(400).send({ status: false, msg: "cannot create data" })
                        }
                        return res.status(201).send({ status: true, data: savedAuthorData });
                    } else { return res.status(400).send({ status: false, data: "password is invalid" }) }
                } else { return res.status(400).send({ status: false, data: "email is invalid" }) }
            } else { return res.status(400).send({ status: false, data: "lname is invalid" }) }
        } else { return res.status(400).send({ status: false, data: "fname is invalid" }) }

    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

const authorLogin = async function (req, res) {
    try {
        let userName = req.body.email;
        let password = req.body.password;
        let data = await authorModel.findOne({ email: userName, password: password });
        if (!data)
            return res.status(400).send({
                status: false,
                msg: "username or the password is not corerct",
            })
        let token = jwt.sign(
            {
                authorId: data._id.toString(),
                admin: true,
                group: 18,
                radonProject: 3
            },
            "functionup-Project-1-Blogging-Room-18"
        );
        res.status(200).setHeader("x-auth-token", token);
        res.status(200).send({ status: true, token: token });
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.authorLogin = authorLogin
module.exports.createAuthor = createAuthor
