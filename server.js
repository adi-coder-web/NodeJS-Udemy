const app=require('./app')
const dotenv=require('dotenv')
const mongoose=require('mongoose')


const db="mongodb+srv://Aditya_Niture:2Pug39kmgSeJCmZF@cluster0.zp8az.mongodb.net/Users";

mongoose.connect(db,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("DB is connected successfully...")).catch(()=>console.log("Error while db connection..."))


const port=4000;

app.listen(port,()=>{
    console.log("Server is listening on port no 4000")
})