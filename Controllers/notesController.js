const asyncHandler=require("express-async-handler");
const Note=require("../Models/notesModel");

const createNote=asyncHandler(async(req,res)=>{
    console.log(req.user)
    if(!req.body.title){
        res.status(400);
        throw new Error("Please enter all the text fields");
    }
    const {title,desc,text}=req.body;
    const note=await Note.create({
        title,desc,text,
        //user details to be added
        user:req.user.id
    });
    res.status(201).send(note)
});
const getNotes=asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }); // only user's notes
  res.status(200).json(notes);
});
const updateNote = asyncHandler(async (req, res) => {
  console.log("📝 Update request ID:", req.params.id);

  const note = await Note.findById(req.params.id);

  if (!note) {
    console.log("❌ No note found with ID:", req.params.id);
    res.status(404); // better than 400
    throw new Error("Note not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

 // if (note.user.toString() !== req.user._id.toString()) {
  //  res.status(403);
  //  throw new Error("User not authorized");
  //}

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).send(updatedNote);
});

/*const updateNote=asyncHandler(async(req,res)=>{
    const note=await Note.findById(req.params.id);
    if(!note){
        res.status(400)
        throw new Error("Note not found");
    }
    if(!req.user){
        res.status(401);
        throw new Error("user not found");
    }
    if (note.user.toString() !== req.user._id.toString()) {
    res.status(403); // better than 401, since user IS authenticated but forbidden
    throw new Error("User not authorized");
}

    const updateNote=await Note.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).send(updateNote);
});
/*const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not authenticated");
  }

  // ✅ This check was reversed before
  if (note.user.toString() !== req.user.id) {
    res.status(403); // 403 = Forbidden
    throw new Error("User not authorized to update this note");
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedNote);
});
*/
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404); // better status code for not found
    throw new Error("Note not found");
  }
  if(!req.user){
    res.status(400);
    throw new Error("user not found")
  }
  if(note.user.toString()!== req.user.id)
  {
    res.status(401);
    throw new Error("user not authorized")
  }
  await note.deleteOne(); // no need to pass {_id}, already scoped to this doc

  res.status(200).json({
    message: "Note deleted successfully",
    id: req.params.id,
  });
});


module.exports={createNote,getNotes,updateNote,deleteNote}