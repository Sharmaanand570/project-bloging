const blogModel = require("../models/blogModel")
const mongoose = require("mongoose")

const createBlogg = async function (req, res) {

}

const getBlogg = async function (req, res) {
    try {
        let blogs = await blogModel.find({ isDeleted: false, isPublished: true });
        if (blogs.length === 0) {
           return res.status(404).send({ status: false, msg: "blogs not found" });
        }
        
        let author_id = req.query.author_id.toString();
        let Category = req.query.category;
        let Tag = req.query.tag;
        let Subcategory = req.query.subcategory;
        if ((!author_id) & (!Category) & (!Tag) & (!Subcategory)) {
            res.send({ status : false, msg : "query not found"})
        }
        console.log(blogs)
        console.log(Category)
        console.log(author_id)
       
        let temp =[]
        for( let i=0 ; i<blogs.length ; i++) {
            let x=blogs[i];
            if( (x.authorId === author_id) ) {
                temp.push(x)
            }
            if( (x.category === Category) ) {
                temp.push(x)
            }
            if( (x.subcategory.includes(Subcategory)) ) {
                temp.push(x)
            }
            if( x.tags.includes(Tag) ) {
                temp.push(x)
            }
        }    
        console.log(temp)
        res.send({ status: true, Data: temp })

    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

const updateBlogg = async function (req, res) {

}

const deleteBloggById = async function (req, res) {
    try {
        const bloggId = req.params.blogId
        if (mongoose.Types.ObjectId.isValid(bloggId)) {
            const bloggDetails = await blogModel.findById(bloggId)
            if (!bloggDetails) {
                res.status(404).send({ status: false, msg: "Blogg Data is Not Available" })
            }
            else {
                if (bloggDetails.isDeleted === true) {
                    res.status(400).send({ status: false, msg: "Data Already Deleted" })
                }
                else {
                    await blogModel.findByIdAndUpdate({ _id: bloggId }, { isDeleted: true, deletedAt: new Date() })
                    res.status(200).send()
                }
            }
        }
        else {
            res.status(400).send({ status: true, msg: "Blogg ID is Not Valid" })
        }
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const deleteBloggByQueryParams = async function (req, res) {
    try {
        const { category, authorId, isPublished } = req.query
        const tagsData = req.query.tags
        const subcategoryData = req.query.subcategory
        if (category && authorId && tagsData && isPublished && subcategoryData) {
            const bloggDetails = await blogModel.find({
                category,
                authorId,
                tags: { $elemMatch: { $eq: tagsData } },
                isPublished,
                isDeleted: false,
                subcategory: {
                    $elemMatch: { $eq: subcategoryData },
                }
            })
            if (Object.keys(bloggDetails).length === 0) {
                res.status(404).send({ status: false, msg: "Blogg Data is Not Available" })
            }
            else {
                await blogModel.updateMany({
                    category,
                    authorId,
                    tags: { $elemMatch: { $eq: tagsData } },
                    isPublished,
                    subcategory: { $elemMatch: { $eq: subcategoryData } }
                },
                    { isDeleted: true, deletedAt: new Date() })
                res.status(200).send()
            }
        }
        else {
            res.status(400).send({ status: false, msg: "require data not matched" })
        }
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createBlogg = createBlogg
module.exports.getBlogg = getBlogg
module.exports.updateBlogg = updateBlogg
module.exports.deleteBloggById = deleteBloggById
module.exports.deleteBloggByQueryParams = deleteBloggByQueryParams