const express=require("express");
const router=express.Router();
const{createNote,getNotes,updateNote,deleteNote}=require("../Controllers/notesController");
const {Protect}=require("../Middleware/auth");

router.get("/", Protect, getNotes);   
router.post("/create",Protect,createNote);
router.put("/update/:id",Protect,updateNote);
router.delete("/delete/:id",Protect,deleteNote);

module.exports=router;