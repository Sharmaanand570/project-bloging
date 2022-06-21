
const createBlogg = async function (req, res) {

}

const getBlogg = async function (req, res) {
    try {    
        let blogs = await BookModel.find({ isDeleted : false, isPublished : true});
        if(blogs.length === 0) {
            res.status(404).send({ status : false, msg : "" });
        }

     let author_id = req.query.authorId;
     let category = req.query.category;
     let tag = req.query.tag;
     let subcategory = req.query.subcategory;

    if(author_id&category&tag&subcategory){
        
    }
      
       }catch(err) {
           res.status(500).send({status : false , error : err.message })
       }
}

const updateBlogg = async function (req, res) {

}

const deleteBloggById = async function (req, res) {

}

const deleteBloggByQueryParams = async function (req, res) {

}

module.exports.createBlogg = createBlogg
module.exports.getBlogg = getBlogg
module.exports.updateBlogg = updateBlogg
module.exports.deleteBloggById = deleteBloggById
module.exports.deleteBloggByQueryParams = deleteBloggByQueryParams