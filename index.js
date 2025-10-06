const express=require("express");
const ConnectDB=require("./Config/DB");
const {registerUser}=require("./Controllers/userController");
const userRoutes=require("./Routes/userRoutes")
const notesRoutes=require("./Routes/notesRoutes");
const app=express();
//console.log(process.env.PORT)
app.use(express.json());

//const PORT=4000;
ConnectDB();
//registerUser();

app.get("/",(req,res)=>{
    res.send("hello world") 
});
app.use("/api/user",userRoutes)
app.use("/api/notes",notesRoutes)
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));



