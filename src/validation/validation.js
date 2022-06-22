const mongoose = require('mongoose')


const isValid = (value)=>{
    if(typeof value ==="Undefined" || value===null) return false 
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  }





const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}




const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

module.exports.isValidRequestBody = isValidRequestBody
module.exports.isValidObjectId = isValidObjectId
module.exports.isValid = isValid