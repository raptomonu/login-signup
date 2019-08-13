const mongoose=require('mongoose')
const schema=mongoose.Schema({
    user:{type:String,require:true},
    mail:{type:String,unique:true,require:true},
    pass:{type:String,require:true},
    phone:{type:Number,require:true},
    check:{type:Number}
})
var db=mongoose.model('monu',schema)
exports.db=db
module.exports=db