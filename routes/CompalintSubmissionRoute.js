const express = require("express");

const router = express.Router();

const compalintSubmissionController = require("../controllers/CompalintSubmissionController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');



router.post("/createComplaintsSubmission",
    //  authenticateUser , authorizeRoles('admin'),
     compalintSubmissionController.createComplaintsSubmission);

router.get("/viewComplaintsSubmission",
    //  authenticateUser , authorizeRoles('admin'),
     compalintSubmissionController.viewComplaintsSubmission);

router.delete("/deleteComplaintsSubmission/:id",
    //  authenticateUser , authorizeRoles('admin'),
     compalintSubmissionController.deleteComplaintsSubmission);

router.put("/updateComplaintsSubmission/:id",
    //  authenticateUser , authorizeRoles('admin'),
     compalintSubmissionController.updateComplaintsSubmission);


module.exports = router;  