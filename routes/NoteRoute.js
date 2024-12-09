const express = require("express");

const router = express.Router();

const NoteController = require("../controllers/NoteController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');



router.post("/createNote" ,
    //  authenticateUser , authorizeRoles('admin'),
      NoteController.createNote);

router.get("/ViewNote",
    //  authenticateUser , authorizeRoles('admin') ,
      NoteController.ViewNote);

router.delete("/deleteNote/:id", 
    //  authenticateUser , authorizeRoles('admin') ,
      NoteController.deleteNote);

router.put("/updateNote/:id" ,
    //  authenticateUser , authorizeRoles('admin') ,
      NoteController.updateNote);



module.exports = router;  