const mongoose=require("mongoose");
require('dotenv').config()
const ConnectDB=async()=>{
    try{
      const connect=await mongoose.connect(process.env.MONGODB_URL);
      console.log("connected to mongodb succesully");

    }catch(e){
        console.log(e)
        process.exit(1);

    }
}
module.exports=ConnectDB;