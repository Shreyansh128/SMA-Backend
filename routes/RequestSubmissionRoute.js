const express = require('express');

const router = express.Router();

const requestSubmissionController = require("../controllers/RequestSubmissionController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');


router.post("/createRequestSubmission",
    //  authenticateUser , authorizeRoles('admin'),
      requestSubmissionController.createRequestSubmission);

router.get("/getRequestSubmission",
    //  authenticateUser , authorizeRoles('admin'),
      requestSubmissionController.getRequestSubmission);

router.delete("/deleteRequestSubmission/:id",
    //  authenticateUser , authorizeRoles('admin'),
      requestSubmissionController.deleteRequestSubmission);

router.put("/updateRequestSubmission/:id",
    //  authenticateUser , authorizeRoles('admin'),
      requestSubmissionController.updateRequestSubmission);


module.exports = router;