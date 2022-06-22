const mongoose = require('mongoose')


const isValid = (value)=>{
    if(typeof value ==="Undefined" || value===null) return{ status : false} 
    //if(typeof value ==="String" )

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