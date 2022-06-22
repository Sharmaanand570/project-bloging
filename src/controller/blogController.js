const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
const mongoose = require('mongoose')
const validator = require('../validator/validator')

const createBlog = async function (req, res) {
    try {


        let data = req.body
        let id = req.body.authorId
        if (!validator.isValidReqBody(data)) { return res.status(400).send({ status: false, msg: "invalid request put valid data in body" })}
        const { title, body, authorId, category } = data
       
        if (!validator.isValid(title)) { return res.status(400).send({ status: false, msg: "title required" }) }
        if (!validator.isValid(body)) { return res.status(400).send({ status: false, msg: "body Request" }) }
        if (!validator.isValid(authorId)) { return res.status(400).send({ status: false, msg: "autherId required" }) }
        if (!validator.isValid(category)) { return res.status(400).send({ status: false, msg: "category required" }) }
        if (!validator.isValidObjId(authorId)) { return res.status(400).send({ status: false, msg: "AutherId invalid" }) }

        const findAuthor = await authorModel.findById(id)
        if (!findAuthor) {
            return res.status(400).send("Auther not exists")
        }
        let saveData = await blogModel.create(data)
        return res.status(201).send({ status: true, msg: "Blog created succesfully", saveData })


} catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }



}













const getBlogg = async function (req, res) {
    try {
        let blogs = await blogModel.find({ isDeleted: false, isPublished: true });
        if (blogs.length === 0) {
            return res.status(404).send({ status: false, msg: "blogs not found" });
        }
        let author_id = req.query.authorId
        const { category, tag, subcategory } = req.query
        let temp = []
        for (let i = 0; i < blogs.length; i++) {
            let x = blogs[i];

            if ((x.authorId.toString() === author_id)) {
                temp.push(x)
                console.log(x.authorId)
            }
            if ((x.category === category)) {
                temp.push(x)
            }
            if ((x.subcategory.includes(subcategory))) {
                temp.push(x)
            }
            if (x.tags.includes(tag)) {
                temp.push(x)
            }
        }
        if (temp.length === 0) {
            res.status(404).send({ status: false, msg: "data not found" })
        }
        else res.send({ status: true, Data: temp })
    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

const updateBlogg = async function (req, res) {
    try {
        const blogId = req.params.blogId
        const data = req.body
        if (mongoose.Types.ObjectId.isValid(blogId)) {
            const bloggDetails = await blogModel.findById(blogId)
            if (bloggDetails && bloggDetails.isDeleted == false) {
                try {
                    let Updatedata = await blogModel.findOneAndUpdate({ _id: blogId }, data, { new: true })
                    return res.status(200).send({ status: true, data: Updatedata })
                }
                catch (error) {
                    res.staus(400).send({ status: false, msg: error.message })
                }
            }
            else {
                res.send({ status: false, msg: "Data is not avaliable" })
            }
        }
        else {
            res.status(404).send({ status: false, msg: " blogId is Invalid" })
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
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
                    try {
                        await blogModel.findByIdAndUpdate({ _id: bloggId }, { isDeleted: true, deletedAt: new Date() })
                        res.status(200).send()
                    }
                    catch (error) {
                        res.status(400).send({ status: false, msg: error.message })
                    }
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
                res.status(404).send({ status: false, msg: "Blog Data is Not Available" })
            }
            else {
                try {
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
                catch (error) {
                    res.status(400).send({ status: false, msg: error.message })
                }
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

module.exports.createBlog = createBlog
module.exports.getBlogg = getBlogg
module.exports.updateBlogg = updateBlogg
module.exports.deleteBloggById = deleteBloggById
module.exports.deleteBloggByQueryParams = deleteBloggByQueryParams