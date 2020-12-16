const AppError=require('../utils/appError')

const handleCastErrorDB=err=>{
    const message=`Invalid ${err.path} : ${err.value}`;
    return new AppError(message,400);
}

const sendErrorDev=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}

const handleDuplicateFieldDB=err=>{
    const value=err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value)

    const message=`Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message,400);
}

const sendErrorPro=(err,res)=>{
//Operational, trusted error: send messages to client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    }
    //programming or other unknown error: dont leak error details
    else{
        // 1. Log Error
        console.log('ERROR ',err)
    
        // 2. Send generic message
        res.status(500).json({
            status:'error',
            message:'Something went very wrong!'
        })
    }
   
}

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    err.status=err.status || 'error'

    if(process.env.NODE_ENV==='development'){
        sendErrorDev(err,res);
    }
    else if(process.env.NODE_ENV==='production'){
            // Handle invalid database id
        let error={...err};
        if(error.name==='CastError') error=handleCastErrorDB(error);
        if(error.code === 11000) error=handleDuplicateFieldDB(error);
        sendErrorPro(err,res);
    }

    // res.status(err.statusCode).json({
    //     status:err.status,
    //     message:err.message
    // })
}