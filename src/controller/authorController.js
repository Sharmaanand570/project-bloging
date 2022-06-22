const AuthorModel = require("../models/authorModel.js")

const createAuthor = async function (req, res){
try {    
 let authorData = req.body;
 let savedAuthorData = await AuthorModel.create(authorData);
 if(!savedAuthorData) {
    res.status(400).send({status: false, msg : ""})
 }
 res.status(201).send({status: true, data : savedAuthorData});
}catch(err) {
    res.status(500).send({status : false , error : err.message })
}
}

module.exports.createAuthor = createAuthor
