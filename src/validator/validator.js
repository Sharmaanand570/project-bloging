const mongoose = require('mongoose')


const isValid = (value)=>{
    if(typeof value ==="Undefined" || value===null) return false
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  }

const isValidReqBody  = function (reqBody) {
    return Object.keys(reqBody).length > 0
}

const isValidObjId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

module.exports.isValidReqBody = isValidReqBody
module.exports.isValidObjId = isValidObjId
module.exports.isValid = isValid 
