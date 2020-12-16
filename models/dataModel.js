const mongoose=require('mongoose')
const validator=require('validator')

const dataSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Please enter name"],
    },
    email:{
        type:String,
       lowercase:true,
       validate:[validator.isEmail,"Please provide a valid email"],
        unique:true,
        required:[true,"Please enter email"]
    },
    photo:[String],
    password:{
        type:String,
        required:[true,"Please enter password"],
        minlength:8
    },
    passwordConfirm:{
        type:String,
        required:[true,"Please confirm password"]
    }
})

const DataModel=mongoose.model("User_Auth",dataSchema)
module.exports=DataModel