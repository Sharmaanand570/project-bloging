const jwt = require("jsonwebtoken")
const blogModel = require("../models/blogModel")

let authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) {
            res.status(404).send({ status: false, msg: "token must be present" })
        }
        else {
            const validToken =jwt.decode(token)
            if(validToken){
                jwt.verify(token, "functionup-Project-1-Blogging-Room-18")
                next()
            }
            else{
                res.status(403).send({ status: false, msg: "Invalid token" })
            }
        }
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


let authorise = async function (req, res, next) {
    try {
        let blogIdParams = req.params.blogId
        const data = await blogModel.findById(blogIdParams).select({ authorId: 1, _id: 0 })
        const token = req.headers["x-api-key"]
        let decodedToken = jwt.verify(token, "functionup-Project-1-Blogging-Room-18")
        if (data.authorId == decodedToken.authorId) {
            next()
        }
        else {
            res.status(401).send("Authorization failed")
        }
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise