// routes/notes.js
const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
// ROUTE 1:Get all the notes using: Get "/api/fetchallnotes". login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");

  }

})
// ROUTE 2:Add the new notes using: Post "/api/notes/addnotes"

router.post('/addnote', fetchuser, [
  body('title', 'Enter the valid name').isLength({ min: 3 }),
  body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
      title, description, tag, user: req.user.id
    })
    const savenote = await note.save()
    res.status(201).json(savenote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
})
// ROUTE 3:Update an existing  notes using: Post "/api/notes/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };
    // Find the note to be updated and update it 
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found"); }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }

})

// ROUTE 4:Delete an existing  notes using: Delete "/api/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // Find the note to be updated and update it 
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found"); }
    //Allow deletion  only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Note has been Deleted ", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }

})
module.exports = router;
