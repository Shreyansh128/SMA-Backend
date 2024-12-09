const express = require("express");

const router = express.Router();

const pollController = require("../controllers/PollController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');



router.post("/createPoll",
    //  authenticateUser , authorizeRoles('admin'),
      pollController.createPoll);

router.get("/getPoll",
    //  authenticateUser , authorizeRoles('admin'),
      pollController.getPoll);

router.delete("/deletePoll/:id",
    //  authenticateUser , authorizeRoles('admin'),
      pollController.deletePoll);


module.exports = router;