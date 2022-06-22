const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
//const ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose')
const validator = require('../validation/validation')
//const { request } = require("express")





const createBlog = async function (req, res) {

    try {
        let data = req.body
        let id = req.body.authorId
        const checkId = await authorModel.findById(id)
        if (!validator.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, msg: "Invalid Details , Please Provide Valid Details" })
        }
       const title=requestBody // Validation Start
        
         if(!validator.isValid(title)){
            return res.status(400).send({status: false , msg :"title is required"})
            
         }




        let savedata = await blogModel.create(data)

        res.status(201).send({ status: true, msg: savedata })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }



}

const getBlogg = async function (req, res) {

}

const updateBlogg = async function (req, res) {
    try {
        let blogId = req.params.blogId
        const title = req.body.title
        const body = req.body.body
        const tages = req.body.tages
        const subcategory = req.body.subcategory
        const isPublished = req.body.isPublished
        if (!validator.isValidObjectId(blogId)) {
            return res.status(404).send({ status: false, msg: "Id is Invalid" })
        }

        let Updatedata = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { title: title, body: body, $addToSet: { tages: tages, subcategory: subcategory }, isPublished: isPublished }, { new: true })
        return res.status(200).send({ status: true, data: Updatedata })


    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }



}



const deleteBloggById = async function (req, res) {

}

const deleteBloggByQueryParams = async function (req, res) {

}

module.exports.createBlog = createBlog
module.exports.getBlogg = getBlogg
module.exports.updateBlogg = updateBlogg
module.exports.deleteBloggById = deleteBloggById
module.exports.deleteBloggByQueryParams = deleteBloggByQueryParams