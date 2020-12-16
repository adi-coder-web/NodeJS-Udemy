const DataUser=require('../models/dataModel')
const catchAsync=require('../utils/catchAsync')

exports.signup=catchAsync(async(req,res)=>{
    const newUser=await DataUser.create(req.body)

    res.status(201).json({
        status:'success',
        data:{
            user:newUser
        }
    })
});