const jwt = require("jsonwebtoken")
const authorModel = require("../models/authorModel")

let authenticate = async function (req, res, next) {
    let token = req.headers["x-auth-token"]
    if (!token) {
        res.send({ status: false, msg: "token must be present" })
    }
    else {
        let decodedToken = jwt.verify(token, "functionUp-radon")
        if (!decodedToken) {
            res.send({ status: false, msg: "token is invalid" })
        }
        else {
            let authorIdParams = req.params.authorId
            let authorIdQuery = req.query.authorId
            let userDetails = await authorModel.findById(authorIdParams || authorIdQuery)
            if (!userDetails) {
                res.send(404).send({ status: false, msg: "No such user exists" })
            }
            else {
                next()
            }
        }
    }
}

let authorise = async function (req, res, next) {
    let authorIdParams = req.params.authorId
    let authorIdQuery = req.query.authorId
    let token = req.headers["x-auth-token"]
    let decodedToken = jwt.verify(token, "functionUp-radon")
    if (authorIdParams === decodedToken.authorId || authorIdQuery === decodedToken.authorId) {
        next()
    }
    else {
        res.send("User not valid")
    }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise