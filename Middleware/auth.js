const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const User = require("../Models/userModel");

const Protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("🛡️ Received Token:", token);

      const decoded = jwt.verify(token, process.env.LOGIN_SECRET_KEY);
      console.log("✅ Decoded Token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        console.log("❌ User not found for ID:", decoded.id);
        res.status(401);
        throw new Error("Not authorized, user not found");
      }

      next();
    } catch (err) {
      console.error("❌ JWT Error:", err.message); // <-- Add this
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }
});

module.exports = { Protect };


/*const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler");
require("dotenv").config()
const User=require("../Models/userModel")


const Protect=asyncHandler(async(req,res,next)=>{
let token;

    if(req.headers.authorization &&
       req.headers.authorization.startsWith("Bearer")     ///Bearer enrghihghsdrftgyhujilol
    ){
        try{
            // token
            token=req.headers.authorization.split(" ")[1];    ///Bearer enrrfvb
            console.log(token);
            const decode=jwt.verify(token,process.env.LOGIN_SECRET_KEY);
            console.log(decode);
            req.user=await User.findById(decoded.id)
            next();

        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error("not authorization")
        }
    }
})
   
module.exports={Protect}*/