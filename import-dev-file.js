const app=require('./app')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const fs=require('fs');
const UserModel = require('./models/userModel');

const db="mongodb+srv://Aditya_Niture:2Pug39kmgSeJCmZF@cluster0.zp8az.mongodb.net/Users";

mongoose.connect(db,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("DB is connected successfully...")).catch(()=>console.log("Error while db connection..."))

const user=JSON.parse(fs.readFileSync('./tours-simple.json','utf-8'));

const importData=async () =>{
    try{
        await UserModel.create(user)
        console.log("data loaded successfully....")
    }
    catch(err){
        console.log(err)
    }
    process.exit()
}

const deleteData=async () =>{
    try{
        await UserModel.deleteMany();
        console.log("data deleted successfully...")
    }
    catch(err){
        console.log(err)
    }
    process.exit()
}

if(process.argv[2]=='--import'){
    importData()
}
else if(process.argv[2]== '--delete'){
    deleteData()
}

console.log(process.argv)