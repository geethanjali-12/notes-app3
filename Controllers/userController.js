const User=require("../Models/userModel");
const asyncHandler=require("express-async-handler");
const jwt = require('jsonwebtoken');
const bcrypt=require("bcryptjs")
require("dotenv").config()
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}= req.body;

    if(!name||!email||!password){
        res.status(400);
        throw new Error("Please fill all the fields")
    }
    //user already exits or not

    const UserExists=await User.findOne(
        {email:email}
    )
    if(UserExists){
        res.status(400);
        throw new Error("user already exists")
    }
    //hash password
    /*const salt=await bcrypt.genSalt(process.env.SALT)
    const hashedpassword=await bcrypt.hash(password.SALT)*/
    const saltRounds = Number(process.env.SALT) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedpassword = await bcrypt.hash(password, salt);

    const user=await User.create({
        name:name,
        email:email,
        password:hashedpassword
    })
    if(User){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
            //token generate
        })    }
        else{
            res.send(400);
            throw new Error("Invalid user data")
        }
    //console.log(salt)
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log("🔍 Found user:", user);

  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials (email not found)");
  }

  const isRight = await bcrypt.compare(password, user.password);
  console.log("✅ Password match:", isRight);

  if (!isRight) {
    res.status(400);
    throw new Error("Invalid credentials (wrong password)");
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id), // make sure you have this function
  });
});

/*const loginUser=asyncHandler(async(req,res)=>{
    const { email, password } = req.body;

    const user=await User.findOne({email});
    console.log(user);
    

    const isRight=await bcrypt.compare(password,user.password)
   console.log(isRight);
    if (!isRight) {
        res.status(400);
        throw new Error("Invalid credentials");
    }
   
    // Respond with user info
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // token code yet to be added
        token:generateToken(user._id),
    });
})*/
const generateToken=(id)=>{
    var token =  jwt.sign({ id },process.env.LOGIN_SECRET_KEY,{expiresIn:"30d"});
    return token;

}

module.exports={registerUser,loginUser};