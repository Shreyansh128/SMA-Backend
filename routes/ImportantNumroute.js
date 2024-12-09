const express = require("express");

const router = express.Router();

const ImportantNumcontroller = require("../controllers/ImortantNumController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');



router.post("/createImportantNum",
    //  authenticateUser , authorizeRoles('admin'),
      ImportantNumcontroller.createImportantNum);

router.get("/getImportantNum",
    //  authenticateUser , authorizeRoles('admin'),
      ImportantNumcontroller.getImportantNum);

router.delete("/deleteImportantNum/:id",
    //  authenticateUser , authorizeRoles('admin'),
      ImportantNumcontroller.deleteImportantNum);

router.put("/updateImportantNum/:id",
    //  authenticateUser , authorizeRoles('admin'),
      ImportantNumcontroller.updateImportantNum);


module.exports = router;  