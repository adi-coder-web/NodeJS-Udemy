const express=require('express');
const morgan=require('morgan')

const dataRouter=require('./routers/dataRouters')
const globalErrorHandler=require('./controllers/errorController')

const AppError=require('./utils/appError')

const app=express()

app.use(express.json())
app.use(morgan('dev'))
// const route=express.Router()

app.use('/data',dataRouter)


//HANDLE ALL UNWANTED ROUTE 
app.all('/*',(req,res,next)=>{
    // OLD VERSION 1.0
    // res.status(404).json({
    //     status:"failed",
    //     message:`Can't find ${req.originalUrl} on this server`
    // });
   
    //OLD VERSION 2.0
    // const err=new Error(`Can't find ${req.originalUrl} on this server`)
    // err.status='fail'
    // err.statusCode=404
    // next(err)

    //NEW VERSION 3.0
    
    next(new AppError(`Cant find ${req.originalUrl} on this server!`,404))
});

app.use(globalErrorHandler)

module.exports=app

