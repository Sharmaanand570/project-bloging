const AuthorModel = require("../models/authorModel.js")

const createAuthor = async function (req, res) {
    try {

        let authorData = req.body;

        const { fname, lname, title, email, password } = authorData;

        if (!(fname && lname && title && email && password)) {
            return res.status(400).send({ status: true, msg: "data not found" })
        }

        let checkMail = await AuthorModel.findOne({ email: email });
        if (checkMail) {
            return res.status(400).send({ status: false, msg: " dupllicate email" })
        }
        

        if ((title !== "Mr") || (title !== "Mrs") || (title !== "Miss")) {
            res.status(400).send({ status: false, msg: "please enter correct title" })
        }

        if ((typeof (fname) === String) && (typeof (lname) === String) && (typeof (title) === String) && (typeof (email) === String) && (typeof (password) === String)) {

            let savedAuthorData = await AuthorModel.create(authorData);
            if (!savedAuthorData) {
                res.status(400).send({ status: false, msg: "" })
            }
            res.status(201).send({ status: true, data: savedAuthorData });
        }
        else {
                   res.status(400).send({ status : true , data: "data is invalid"})                         
        }
           

    
    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.createAuthor = createAuthor
