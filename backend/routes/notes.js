const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const Notes = require("../modles/Notes");
const { body, validationResult } = require("express-validator");

// Route1: get all notes
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    cosole.error(error.message);
    res.status(500).send("Internal server error occured");
  }
})


// Route2: Add notes
router.post(
  "/addnotes",
  fetchUser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "description must contain atleast 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await notes.save();
      res.json(savedNotes);
    } catch (error) {
        cosole.error(error.message);
        res.status(500).send("Internal server error occured");
    }
  }
);

// Route3: update note
    router.put("/updatenotes/:id",fetchUser, async (req, res)=> {
        try {
        const {title, description, tag}= req.body;
        
        const newNote= {};
        if(title){newNote.title= title};
        if(description){newNote.description= description};
        if(tag){newNote.tag= tag};
        
        let notes= await Notes.findById(req.params.id);
        if(!notes){
            return res.status(404).send("Not Found")
        }
        if(notes.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied");
        }
        
        notes= await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({notes});
    } catch (error) {
        cosole.error(error.message);
        res.status(500).send("Internal server error occured");
      }
})

// Route4: delete note
    router.delete("/deleteenotes/:id",fetchUser, async (req, res) => {
        try {
            let notes= await Notes.findById(req.params.id);
            if(!notes){
                return res.status(404).send("Not Found")
            }
            if(notes.user.toString() !== req.user.id){
                return res.status(401).send("Access Denied");
            }
            
            notes= await Notes.findByIdAndDelete(req.params.id);
            res.json({"Note delete": "Sucessfuly", notes: notes});
        
        } catch (error) {
            cosole.error(error.message);
            res.status(500).send("Internal server error occured");
          }
    })

module.exports = router;