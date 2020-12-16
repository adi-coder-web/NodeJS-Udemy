// const fs=require('fs')
// const data=JSON.parse(fs.readFileSync('D:/All about nodejs/mynode/users.json'))
const UserModel=require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync=require('../utils/catchAsync')  // Adding this you will not require try and catch and also removes catch block as it is repeated

exports.getAllData=catchAsync(async (req,res,next)=>{
    // try{
       
        const user=await UserModel.find()

    // Displaying not found output
        if(!user){
            next(new AppError("No found data",404))
        }

        res.status(200).json({
            status:"success",
            data:{
                user
            }
        });
    // }
    // catch(err){
    //     res.status(404).json({
    //         status:"failed geting all data",
    //         message:"invalid content"
    //     })
    // }
})

exports.postData=catchAsync(async (req,res,next)=>{
    // try{
        const newUser=await UserModel.create(req.body)

            res.status(200).json({
                status:"success",
                data:{
                    newUser
                }
            })        
    // }
    // catch(err){
    //     res.status(400).json({
    //         status:"failed to post data",
    //         message:"provide correct content"
    //     })
    // }


    // const newId=data[data.length - 1].id + 1;
    // const newData=Object.assign({id:newId},req.body)

    // data.push(newData)
    // if(!newData){
    //     res.status(400).json({
    //         status:"failed",
    //         message:"provide correct content of data"
    //     })
    // }
    // res.status(200).json({
    //     status:"success",
    //     data:{
    //         newData
    //     }
    // })
 })

 exports.getData=catchAsync( async(req,res,next)=>{
    // try{
        const data=await UserModel.findById(req.params.id);
        
        //Displaying not found
        if(!data){
            next(new AppError("No found data with that id",404))
        }

        res.status(200).json({
            status:"success",
            data:{
                data
            }
        })
    // }
    // catch(err){
    //     res.status(400).json({
    //         status:"failed to get data",
    //         message:"invlaid id"
    //     })
    // }

    // const id=req.params.id * 1;
    // const getdata=data.find(el=>el.id===id)
    // if(!getdata){
    //     res.status(400).json({
    //         status:"failed",
    //         message:"invlaid id"
    //     });
    // }
    // res.status(200).json({
    //     status:"success",
    //     data:{
    //         getdata
    //     }
    // })
})

exports.updateData=catchAsync(async (req,res,next)=>{
    // try{
        const updatedata= await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    
        //Displaying not found 
        if(!updatedata){
            next(new AppError("No found data with that id",404))
        }

        res.status(200).json({
            status:"success",
            data:{
                updatedata
            }
        })
    // }    
    // catch(err){ 
    //     res.status(400).json({
    //         status:"failed to update data",
    //         message:"invalid id"
    //     })
    // }
    
    // const id=req.params.id * 1;
    // const gdata=data.find(el=>el.id===id)

    //    if(!gdata){
    //        req.status(400).json({
    //            status:"failed",
    //            message:"invalid id"
    //        })
    //    }
    //    fs.writeFile('./users.json',JSON.stringify(data),err=>{
    //        res.status(200).json({
    //            status:"success",
    //            data:{
    //                gdata
    //            }
    //        });
    //    })
})

   exports.deleteData=catchAsync(async (req,res,next)=>{
    // try{
        const delData=await UserModel.findByIdAndDelete(req.params.id)

    //Displaying not found 
    if(!delData){
         next(new AppError("No found data with that id",404))
    }


        res.status(200).json({
            status:"success",
            data:{delData}
        })
    // }
    // catch(err){
    //     res.status(400).json({
    //         status:"failed to delete data",
    //         message:"invalid id"
    //     })
    // }
    
    // if(req.params.id * 1 > data.length){
    //     res.status(400).json({
    //         status:"failed",
    //         message:"invalid id"
    //     })
    // }
    // res.status(200).json({
    //     status:"success",
    //     data:null
    // })
})

exports.userStats=catchAsync(async(req,res,next)=>{
    // try{
        console.log("getAllData")
        const stats=await UserModel.aggregate([
            {
                $match:{ratingsAverage:{$gte:4.5}}
            },
            {
                $group:{
                    _id:{$toUpper:'$startDates'},
                    numToursStarts:{$sum:1},
                    tours:{$push:'$name'}  
                }
            },
            {
                $addFields:{month:'$_id'}
            },
            {
                $project:{_id:0}
            },
            {
                $sort:{numToursStarts:-1}
            },
            {
                $limit:6
            }
        ]);
       
         res.status(200).json({
             status:"success",
             data:{
                 stats
             }
         });
    //  }
    //  catch(err){
    //      res.status(404).json({
    //          status:"failed to show user stats",
    //          message:err
    //      })
    //  }
})

exports.getMonthlyPlan=catchAsync(async (req,res,next)=>{
    // try{
        const year=req.params.year * 1;
        const plan= await UserModel.aggregate([
            {
                $unwind:'$startDates'
            },
            {
                $match:{
                    startDates:{
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group:{
                    _id:{$toUpper:'$difficulty'},
                    numTours:{$sum:1},
                    numRatings:{$sum:'$ratingsQuantity'},
                    avgRatings:{$avg:'$ratingsAverage'},
                    avgPrice:{$avv:'$price'},
                    minPrice:{$min:'$price'},
                    maxPrice:{$max:'$price'}
                }
            },
            {
                $sort:{avgPrice:1}
            }
        ]);

        res.status(200).json({
            status:"success",
            data:null
        })
    // }
    // catch(err){
    //     res.status(400).json({
    //         status:"failed to get montly plan",
    //         message:"invalid id"
    //     })
    // }
})


 