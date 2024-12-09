const express = require("express");

const router = express.Router();

const OtherIncomController = require("../controllers/OtherIncomeController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');



router.post("/createOtherIncome",
    //  authenticateUser , authorizeRoles('admin'),
      OtherIncomController.createOtherIncome);

router.get("/getOtherIncome",
    //  authenticateUser , authorizeRoles('admin'),
      OtherIncomController.getOtherIncome);

router.delete("/deleteOtherIncome/:id",
    //  authenticateUser , authorizeRoles('admin'),
      OtherIncomController.deleteOtherIncome);

router.put("/updateOtherIncome/:id",
    //  authenticateUser , authorizeRoles('admin'),
      OtherIncomController.updateOtherIncome);


module.exports = router;